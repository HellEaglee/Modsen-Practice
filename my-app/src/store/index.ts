import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import placesReducer from "./reducers/placesSlice";
import currentCoordinatesReducer from "./reducers/currentCoordsSlice";
import typeReducer from "./reducers/typeSlice";
import rangeReducer from "./reducers/rangeSlice";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    places: placesReducer,
    currentCoordinates: currentCoordinatesReducer,
    type: typeReducer,
    range: rangeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
