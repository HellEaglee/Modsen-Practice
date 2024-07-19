"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from "../MarkerInfoWindow/MarkerInfoWindow";
import { Circle } from "../Circle/Circle";
import { usePlaces } from "@/hooks/usePlaces";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import Directions from "../Directions/Directions";

type LatLngLiteral = google.maps.LatLngLiteral;

const getColors = (range: number) => {
  let strokeColor, fillColor;

  if (range <= 1000) {
    strokeColor = fillColor = "#b6d7a8";
  } else if (range <= 2000) {
    strokeColor = fillColor = "#ffe599";
  } else {
    strokeColor = fillColor = "#ea9999";
  }

  return { strokeColor, fillColor };
};

export const MapComponent = () => {
  const dispatch = useDispatch();
  const range = useSelector((state: RootState) => state.range.range);
  const type = useSelector((state: RootState) => state.type.type);
  const coordinates = useSelector(
    (state: RootState) => state.currentCoordinates.currentCoordinates
  );

  const places = useSelector((state: RootState) => state.places.places);

  const [selectedPlace, setSelectedPlace] = useState<LatLngLiteral | null>(
    null
  );

  usePlaces(coordinates, range, type);
  const isMapLoading = useCurrentLocation();

  const { strokeColor, fillColor } = getColors(range);

  if (isMapLoading) return <div>Map is loading...</div>;

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    return <div>No key to use!</div>;

  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          key={coordinates.lat + coordinates.lng}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID_KEY}
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={coordinates}
          defaultZoom={13}
          disableDefaultUI={true}
          onClick={() => {
            setSelectedPlace(null);
          }}
          reuseMaps
        >
          <Circle
            radius={range}
            center={coordinates}
            strokeColor={strokeColor}
            fillColor={fillColor}
            onClick={() => {
              setSelectedPlace(null);
            }}
          />
          <AdvancedMarker position={coordinates}>
            {/* <img
              src={currentLocation_marker.src}
              className="w-[36px] h-[36px]"
            /> */}
          </AdvancedMarker>

          {places.map((place, index) => {
            const placeCoordinates = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            return (
              <MarkerWithInfowindow
                key={index}
                position={placeCoordinates}
                place={place}
                type={type}
                onClick={() => {
                  console.log("Place clicked:", placeCoordinates);
                  setSelectedPlace(placeCoordinates);
                }}
              />
            );
          })}

          {selectedPlace && (
            <Directions origin={coordinates} destination={selectedPlace} />
          )}
        </Map>
      </APIProvider>
    </div>
  );
};
