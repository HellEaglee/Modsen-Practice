import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CurrentCoordinatesState = {
  currentCoordinates: {
    lat: 0,
    lng: 0,
  },
};

const currentCoordinatesSlice = createSlice({
  name: "currentCoordinates",
  initialState,
  reducers: {
    setCurrentCoordinates(state, action: PayloadAction<Coordinates>) {
      state.currentCoordinates = action.payload;
    },
  },
});

export const { setCurrentCoordinates } = currentCoordinatesSlice.actions;
export default currentCoordinatesSlice.reducer;
