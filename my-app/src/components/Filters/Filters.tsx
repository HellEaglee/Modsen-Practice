import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "@/store/reducers/typeSlice";
import { setRange } from "@/store/reducers/rangeSlice";
import { RootState } from "@/store";

import { items } from "@/constants";

export const Filters = () => {
  const dispatch = useDispatch();
  const range = useSelector((state: RootState) => state.range.range);
  const type = useSelector((state: RootState) => state.type.type);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    setSelectedType(type);
  }, [type]);

  return (
    <div className="flex flex-col justify-between mt-[35px]">
      <h1 className="text-[20px] font-extrabold mb-[15px]">Искать:</h1>
      <div className="flex flex-col w-[350px] h-[390px] border-2 border-black rounded-lg p-5 gap-5 mb-7">
        {items.map((item) => (
          <div
            key={item.type}
            className="flex items-center gap-5 cursor-pointer"
            onClick={() => dispatch(setType(item.type))}
          >
            <img src={item.icon.src} alt={item.label} className="w-8 h-8" />
            <p
              className={`text-sm font-bold ${
                selectedType === item.type ? "text-black" : "text-gray-500"
              }`}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center">
          <h1 className="text-[20px] font-extrabold mr-[15px]">В радиусе:</h1>
          <input
            type="number"
            value={range}
            readOnly
            disabled
            className="flex items-center bg-white text-[18px] font-bold w-[100px]"
          />
        </div>
        <input
          type="range"
          min={500}
          max={3000}
          step={100}
          className="flex w-[350px] items-center"
          onChange={(e) => {
            dispatch(setRange(Number(e.target.value)));
          }}
        />
      </div>
    </div>
  );
};
