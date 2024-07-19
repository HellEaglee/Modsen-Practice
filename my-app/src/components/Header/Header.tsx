"use client";

import { setType } from "@/store/reducers/typeSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRange } from "@/store/reducers/rangeSlice";
import { RootState } from "@/store";
import { Autocomplete } from "@react-google-maps/api";
import { setCurrentCoordinates } from "@/store/reducers/currentCoordsSlice";
import { PlacesDetails } from "../PlacesDetails/PlacesDetails";
import { Filters } from "../Filters/Filters";
import { Favorites } from "../Favorites/Favorites";

import FilterOnIcon from "@/assets/Filter1Icon.svg";
import FilterOffIcon from "@/assets/Filter2Icon.svg";
import FavOnIcon from "@/assets/Fav2Icon.svg";
import FavOffIcon from "@/assets/Fav1Icon.svg";

export const Header = () => {
  const dispatch = useDispatch();

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const [tab, setTab] = useState<number>(1);

  const onLoad = (autoC: google.maps.places.Autocomplete) =>
    setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const place = autocomplete?.getPlace();
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      dispatch(setCurrentCoordinates({ lat, lng }));
    }
  };

  return (
    <div className="flex z-50 absolute w-[510px] h-[100vh] max-h-[100vh] bg-white">
      <div className="flex flex-col items-center w-[110px] h-[100vh] max-h-[100vh] gap-[15px] py-[25px] border-r-2 border-gray-200">
        <div
          className={`flex justify-center items-center w-[60px] h-[60px] rounded-md ${
            tab === 1
              ? "bg-yellow-300 text-white"
              : "bg-white border-[3px] border-gray-300"
          }`}
          onClick={() => {
            setTab(1);
          }}
        >
          <p className="font-extrabold text-[24px]">S</p>
        </div>
        <div
          className={`flex justify-center items-center w-[60px] h-[60px] rounded-md ${
            tab === 2
              ? "bg-[#5E7BC7] border-none"
              : "bg-white border-[3px] border-gray-300"
          }`}
          onClick={() => {
            setTab(2);
          }}
        >
          {tab === 2 ? (
            <img src={FilterOnIcon.src} alt="" />
          ) : (
            <img src={FilterOffIcon.src} alt="" />
          )}
        </div>
        <div
          className={`flex justify-center items-center w-[60px] h-[60px] rounded-md ${
            tab === 3
              ? "bg-[#C75E5E] border-none"
              : "bg-white border-[3px] border-gray-300"
          }`}
          onClick={() => {
            setTab(3);
          }}
        >
          {tab === 3 ? (
            <img src={FavOnIcon.src} alt="" />
          ) : (
            <img src={FavOffIcon.src} alt="" />
          )}
        </div>
      </div>
      <div className="w-[400px] h-[100vh] max-h-[100vh] bg-white p-[25px]">
        <div>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Место, адрес"
              className="px-[15px] w-[100%] h-[40px] border-[1px] border-gray-200"
            />
          </Autocomplete>
        </div>
        {tab === 1 && <PlacesDetails />}
        {tab === 2 && <Filters />}
        {tab === 3 && <Favorites />}
      </div>
    </div>
  );
};
