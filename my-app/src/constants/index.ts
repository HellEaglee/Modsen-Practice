import ArchitectureIcon from "@/assets/Architecture1Icon.svg";
import NatureIcon from "@/assets/NatureIcon.svg";
import CultureIcon from "@/assets/CultureIcon.svg";
import HistoryIcon from "@/assets/HistoryIcon.svg";
import ReligionIcon from "@/assets/Religion1Icon.svg";
import RestaurantIcon from "@/assets/FoodIcon.svg";
import HotelIcon from "@/assets/Hotel1Icon.svg";

const items = [
  {
    type: "tourist_attraction",
    icon: ArchitectureIcon,
    label: "Архитектура",
  },
  { type: "park", icon: NatureIcon, label: "Природа" },
  { type: "art_gallery", icon: CultureIcon, label: "Культура" },
  { type: "museum", icon: HistoryIcon, label: "История" },
  { type: "church", icon: ReligionIcon, label: "Религия" },
  { type: "restaurant", icon: RestaurantIcon, label: "Рестораны" },
  { type: "lodging", icon: HotelIcon, label: "Отели" },
];

const scriptURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
const dataImage =
  "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg";

export { items, scriptURL, dataImage };
