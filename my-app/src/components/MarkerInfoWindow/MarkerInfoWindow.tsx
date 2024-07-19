import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { dataImage } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { items } from "@/constants";
import DefaultIcon from "@/assets/OtherIcon.svg";

export const MarkerWithInfowindow = (props: any) => {
  const type = useSelector((state: RootState) => state.type.type);

  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [selectedType, setSelectedType] = useState(props.type);

  useEffect(() => {
    setSelectedType(props.type);
  }, [props.type]);

  const getIconForType = (type: string) => {
    const item = items.find((item) => item.type === type);
    return item ? item.icon : DefaultIcon;
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => {
          setInfowindowOpen(true);
          if (props.onClick) {
            props.onClick();
          }
        }}
        position={props.position}
        title={props.place.name}
      >
        <img
          src={
            getIconForType(
              props.place.types.includes(selectedType)
                ? selectedType
                : props.place.types[0]
            ).src
          }
          className="w-[32px] h-[32px]"
        />
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <div className="gap-[10px]">
            <h1 className="font-bold">{props.place.name}</h1>
            <img
              className="object-cover w-24 h-24 overflow-hidden rounded-lg"
              src={
                props.place.photos && props.place.photos.length > 0
                  ? props.place.photos[0].getUrl()
                  : dataImage
              }
              alt={props.place.name || "Place Image"}
            />
            <p>{props.place.vicinity}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
