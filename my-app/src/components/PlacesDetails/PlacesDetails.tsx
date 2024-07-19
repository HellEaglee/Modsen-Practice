import { RootState } from "@/store";
import { Rating } from "@mui/material";
import { IoLocation } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataImage } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { addPlaceToFavorites } from "@/store/actions/favoritesAction";

export const PlacesDetails = () => {
  const { isAuth } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const places = useSelector((state: RootState) => state.places.places);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (places.length > 0) setLoading(false);
    if (places.length === 0) setLoading(true);
  }, [places]);

  const handleAddFavorites = (place: Place) => {
    if (!isAuth) {
      router.push("/auth");
    } else {
      // @ts-ignore
      dispatch(addPlaceToFavorites(user.id, place));
    }
  };

  if (loading) {
    return (
      <div className="h-screen mt-[35px] z-10 overflow-y-scroll max-h-[85vh] bg-white bg-opacity-90 px-2 flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="p-6 mt-3 bg-white shadow-lg">
            <div className="h-24 w-24 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="mt-4 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-300 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-[35px] flex flex-col gap-4 overflow-y-scroll max-h-[85vh]">
      {places.map((place, index) => (
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
              onClick={() => handleAddFavorites(place)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Добавить в избранное
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
