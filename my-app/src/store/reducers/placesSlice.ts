import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlacesState = {
  places: [],
  favorites: [],
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<Place[]>) {
      state.places = action.payload;
    },
    clearPlaces(state) {
      state.places = [];
    },
    addToFavorites(state, action: PayloadAction<Place>) {
      const placeExists = state.favorites.some(
        (place) => place.place_id === action.payload.place_id
      );
      if (!placeExists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        (place) => place.place_id !== action.payload
      );
    },
  },
});

export const { setPlaces, clearPlaces, addToFavorites, removeFromFavorites } =
  placesSlice.actions;
export default placesSlice.reducer;
