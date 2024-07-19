import { Header } from "@/components/Header/Header";
import { MapComponent } from "@/components/MapComponent/MapComponent";
import React from "react";

export const Main = () => {
  return (
    <div className="relative">
      <Header />
      <MapComponent />
    </div>
  );
};
