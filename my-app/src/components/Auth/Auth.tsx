import { LoginTab } from "@/components/LoginTab/LoginTab";
import { RegisterTab } from "@/components/RegisterTab/RegisterTab";
import { setUser } from "@/store/reducers/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/utils/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Auth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [tab, setTab] = useState<number>(1);

  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          // @ts-ignore
          setUser({ email: user.email, id: user.uid, token: user.refreshToken })
        );
        router.push("/");
      })
      .catch(console.error);
  };

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          // @ts-ignore
          setUser({ email: user.email, id: user.uid, token: user.refreshToken })
        );
        router.push("/");
      })
      .catch(() => alert("Invalid user!"));
  };

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex justify-center items-center">
        <div className="w-[500px] h-[600px] rounded-xl shadow-lg">
          <div className="flex w-[full] h-[100px] items-center border-b-2 border-gray-200">
            <div className="flex justify-center items-center w-[50%] cursor-pointer">
              <p
                className={`text-[24px] font-extrabold ${
                  tab === 1 ? "text-black" : "text-gray-500"
                }`}
                onClick={() => {
                  setTab(1);
                }}
              >
                Login
              </p>
            </div>
            <div className="flex justify-center items-center w-[50%] cursor-pointer">
              <p
                className={`text-[24px] font-extrabold ${
                  tab === 2 ? "text-black" : "text-gray-500"
                }`}
                onClick={() => {
                  setTab(2);
                }}
              >
                Register
              </p>
            </div>
          </div>
          {tab === 1 && <LoginTab handleClick={handleLogin} />}
          {tab === 2 && <RegisterTab handleClick={handleRegister} />}
        </div>
        <div className="absolute top-[20px] left-[20px] w-[80px] h-[40px] rounded-md shadow-lg">
          <Link className="size-full" href="/">
            <p className="flex justify-center font-extrabold items-center size-full">
              НАЗАД
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
