import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlaces, clearPlaces } from "@/store/reducers/placesSlice";
import { RootState } from "@/store";

interface ExtendedPlaceResult extends google.maps.places.PlaceResult {
  isOpen?: boolean | null;
}

export const usePlaces = (
  coordinates: google.maps.LatLngLiteral,
  range: number,
  type: string
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: coordinates,
      radius: range,
      type: type,
      language: "RU",
    };

    service.nearbySearch(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          Promise.all(
            results.map((place) => {
              if (!place.place_id) {
                return Promise.reject(
                  `Place ID is undefined for place: ${place.name}`
                );
              }
              return new Promise<ExtendedPlaceResult>((resolve, reject) => {
                service.getDetails(
                  { placeId: place.place_id! },
                  (details, status) => {
                    if (
                      status === google.maps.places.PlacesServiceStatus.OK &&
                      details
                    ) {
                      const extendedPlace: ExtendedPlaceResult = {
                        ...place,
                        isOpen: details.opening_hours
                          ? details.opening_hours.isOpen()
                          : null,
                        // @ts-ignore
                        business_status:
                          details.business_status ||
                          place.business_status ||
                          "",
                      };
                      resolve(extendedPlace);
                    } else {
                      reject(
                        `Failed to get details for place ID: ${place.place_id}, status: ${status}`
                      );
                    }
                  }
                );
              });
            })
          )
            .then((detailedResults) => {
              dispatch(setPlaces(detailedResults as unknown as Place[]));
              console.log(detailedResults);
            })
            .catch((error) => {
              console.error("Error fetching place details:", error);
            });
        } else {
          console.error("Some error:", status);
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            dispatch(clearPlaces());
          }
        }
      }
    );
  }, [coordinates, range, type, dispatch]);
};
