import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getAuth, signOut } from "firebase/auth";

import UserOnIcon from "@/assets/UserIcon.svg";
import UserOffIcon from "@/assets/NonUserIcon.svg";
import { clearUser } from "@/store/reducers/userSlice";

export const UserButton = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const userEmail = useSelector((state: RootState) => state.user.email);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        dispatch(clearUser());
      })
      .catch((error) => {
        console.log("sign out error:", error);
      });
  }

  if (isAuth)
    return (
      <div className="absolute top-[20px] right-[20px] bg-white shadow-lg rounded-lg p-4">
        <div className="flex flex-col items-center">
          <p className="mb-2 text-[14px]">{userEmail}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </div>
    );

  return (
    <div className="absolute top-[20px] right-[20px] size-[40px] bg-white shadow-md rounded-lg">
      <Link className="size-full" href="/auth">
        <div className="size-full">
          <img src={UserOffIcon.src} alt="" />
        </div>
      </Link>
    </div>
  );
};
