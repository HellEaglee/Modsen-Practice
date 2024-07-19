import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RangeState = {
  range: 1800,
};

const rangeSlice = createSlice({
  name: "range",
  initialState,
  reducers: {
    setRange(state, action: PayloadAction<number>) {
      state.range = action.payload;
    },
  },
});

export const { setRange } = rangeSlice.actions;
export default rangeSlice.reducer;
