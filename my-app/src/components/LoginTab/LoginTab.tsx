import React, { FC, useState } from "react";

export const LoginTab: FC<FormProps> = ({ handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col p-[20px]">
      <p className="text-[18px] font-bold mb-[20px]">Email</p>
      <input
        type="text"
        value={email}
        onChange={(event: any) => setEmail(event.target.value)}
        placeholder="Your email"
        className="pl-[15px] w-[400px] h-[40px] rounded-md mb-[20px] border border-gray-300"
      />
      <p className="text-[18px] font-bold mb-[20px]">Password</p>
      <input
        type="password"
        value={password}
        onChange={(event: any) => setPassword(event.target.value)}
        placeholder="Your password"
        className="pl-[15px] w-[400px] h-[40px] rounded-md mb-[20px] border border-gray-300"
      />
      <button
        title="SIGN IN"
        onClick={() => handleClick(email, password)}
        className="w-[200px] h-[30px] rounded-sm bg-blue-300"
      >
        Войти
      </button>
    </div>
  );
};
