import { addFavoritePlace, deleteFavoritePlace } from "@/utils/firestore";
import { addToFavorites, removeFromFavorites } from "../reducers/placesSlice";
import { AppDispatch } from "..";

export const addPlaceToFavorites =
  (userId: string, place: Place) => async (dispatch: AppDispatch) => {
    try {
      await addFavoritePlace(userId, place.place_id);
      dispatch(addToFavorites(place));
    } catch (error) {
      console.error("Failed to add place:", error);
    }
  };

export const deletePlaceFromFavorites =
  (userId: string, placeId: string) => async (dispatch: AppDispatch) => {
    try {
      await deleteFavoritePlace(userId, placeId);
      dispatch(removeFromFavorites(placeId));
    } catch (error) {
      console.error("Failed to delete place:", error);
    }
  };
