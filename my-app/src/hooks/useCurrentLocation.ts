import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentCoordinates } from "@/store/reducers/currentCoordsSlice";

export const useCurrentLocation = () => {
  const dispatch = useDispatch();
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(setCurrentCoordinates({ lat: latitude, lng: longitude }));
        setIsMapLoading(false);
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  }, [dispatch]);

  return isMapLoading;
};
