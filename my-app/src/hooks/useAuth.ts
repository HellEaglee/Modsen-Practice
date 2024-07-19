import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { email, token, id } = useSelector((state: RootState) => state.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
