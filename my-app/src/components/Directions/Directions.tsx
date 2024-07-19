import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type DirectionsProps = {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
};

export default function Directions({ origin, destination }: DirectionsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;

    const newDirectionsService = new routesLibrary.DirectionsService();
    const newDirectionsRenderer = new routesLibrary.DirectionsRenderer({ map });

    setDirectionsService(newDirectionsService);
    setDirectionsRenderer(newDirectionsRenderer);

    return () => {
      newDirectionsRenderer.setMap(null);
    };
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        language: "RU",
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => {
        console.error("Error fetching directions", error);
      });
  }, [directionsService, directionsRenderer, origin, destination]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="absolute z-101 top-[20px] left-[530px] ">
      <div className="w-[220px] h-[100px] bg-white shadow-md rounded-md p-[10px]">
        <p className="text-[13px]">
          <span className="text-green-600">
            {leg.start_address.split(",")[0]}
          </span>{" "}
          to{" "}
          <span className="text-red-600">{leg.end_address.split(",")[0]}</span>
        </p>
        <p>Расстояние: {leg.distance?.text}</p>
        <p>Время до места: {leg.duration?.text}</p>
      </div>
    </div>
    // <div className="directions">
    //   <h2>{selected.summary}</h2>
    //   <p>
    //     {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
    //   </p>
    //   <p>Distance: {leg.distance?.text}</p>
    //   <p>Duration: {leg.duration?.text}</p>

    //   <h2>Other Routes</h2>
    //   <ul>
    //     {routes.map((route, index) => (
    //       <li key={route.summary}>
    //         <button onClick={() => setRouteIndex(index)}>
    //           {route.summary}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
