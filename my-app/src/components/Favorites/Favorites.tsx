import { useAuth } from "@/hooks/useAuth";
import { RootState } from "@/store"; // Adjust the import path as necessary
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { IoLocation } from "react-icons/io5";
import { dataImage } from "@/constants";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/store/reducers/placesSlice";
import { deletePlaceFromFavorites } from "@/store/actions/favoritesAction";
import { getFavoritePlaces } from "@/utils/firestore";

export const Favorites = () => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const favorites = useSelector((state: RootState) => state.places.favorites);

  const handleRemoveFavorites = (place: Place) => {
    // @ts-ignore
    dispatch(deletePlaceFromFavorites(userId, place.place_id));
  };

  useEffect(() => {
    const fetchFavoritePlaces = async () => {
      if (isAuth) {
        const service = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );

        try {
          // @ts-ignore
          const favoritePlacesId = await getFavoritePlaces(userId);

          favoritePlacesId.forEach((item) => {
            // @ts-ignore
            const placeId = item.place_id;
            const request = {
              language: "RU",
              placeId: placeId,
              fields: [
                "name",
                "vicinity",
                "rating",
                "user_ratings_total",
                "geometry",
                "photos",
                "place_id",
              ],
            };
            // @ts-ignore
            service.getDetails(request, (place, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // @ts-ignore
                dispatch(addToFavorites(place));
              } else {
                console.error("Place details request failed:", status);
              }
            });
          });
        } catch (error) {
          console.error("Error fetching favorite places:", error);
        }
      }
    };

    fetchFavoritePlaces();
  }, [userId, dispatch]);

  if (!isAuth)
    return (
      <div className="flex flex-col justify-between mt-[35px]">
        <h1 className="text-[20px] font-extrabold mb-[15px]">Избранное</h1>
        <div>Войдите в аккаунт!</div>
      </div>
    );

  if (favorites.length === 0)
    return (
      <div className="flex flex-col justify-between mt-[35px]">
        <h1 className="text-[20px] font-extrabold mb-[15px]">Избранное</h1>
        <div>Ничего не добавлено</div>
      </div>
    );

  return (
    <div className="flex flex-col justify-between mt-[35px]">
      <h1 className="text-[20px] font-extrabold mb-[15px]">Избранное</h1>
      <div className="mt-3  flex flex-col gap-4 overflow-y-scroll max-h-[75vh]">
        {favorites.map((place, index) => (
          <div key={index} className="p-6 mt-3 bg-white shadow-lg">
            <img
              src={
                place.photos && place.photos.length > 0
                  ? place.photos[0].getUrl()
                  : dataImage
              }
              alt=""
              className="size-24 rounded"
            />
            <div className="mt-4 space-y-4">
              <h2>{place.name}</h2>
              <div className="flex">
                <Rating size="small" value={Number(place.rating)} readOnly />
                <p>{place.user_ratings_total}</p>
              </div>
              <div className="flex">
                <IoLocation fontSize={20} className="text-gray-500" />
                <p>{place.vicinity}</p>
              </div>
              <button
                onClick={() => handleRemoveFavorites(place)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
