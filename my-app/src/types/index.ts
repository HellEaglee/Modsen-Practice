type Coordinates = {
  lat: number;
  lng: number;
};

type Geometry = {
  location: Coordinates;
  viewport: {
    northeast: Coordinates;
    southwest: Coordinates;
  };
};

type Photo = {
  html_attributions: string[];
  getUrl: () => string;
};

type Place = {
  business_status: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  name: string;
  opening_hours: {
    isOpen: () => boolean;
  };
  photos: Photo[];
  place_id: string;
  rating: number;
  user_ratings_total: number;
  vicinity: string;
  utc_offset_minutes: number;
};

type CurrentCoordinatesState = {
  currentCoordinates: Coordinates;
};

type TypeState = {
  type: string;
};

type RangeState = {
  range: number;
};

type PlacesState = {
  places: Place[];
  favorites: Place[];
};

type PlacesDetailsState = {
  placesDetails: Place[];
};

type UserState = {
  email: string | null;
  token: string | null;
  id: string | null;
};

type NearbySearchResponse = {
  results: Place[];
};

type PlaceListProps = {
  place: Place;
};

type FormProps = {
  handleClick: (email: string, password: string) => void;
};
