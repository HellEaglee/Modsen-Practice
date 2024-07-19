import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TypeState = {
  type: "tourist_attraction",
};

const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
  },
});

export const { setType } = typeSlice.actions;
export default typeSlice.reducer;
