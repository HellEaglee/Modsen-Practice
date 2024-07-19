import React, { FC, useState } from "react";

interface FormProps {
  handleClick: (email: string, password: string) => void;
}

export const RegisterTab: FC<FormProps> = ({ handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      handleClick(email, password);
    }
  };

  return (
    <div className="flex flex-col p-[20px]">
      <p className="text-[18px] font-bold mb-[20px]">Email</p>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email"
        className="pl-[15px] w-[400px] h-[40px] rounded-md mb-[20px] border border-gray-300"
      />
      <p className="text-[18px] font-bold mb-[20px]">Password</p>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Your password"
        className="pl-[15px] w-[400px] h-[40px] rounded-md mb-[20px] border border-gray-300"
      />
      <p className="text-[18px] font-bold mb-[20px]">Confirm password</p>
      <input
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        placeholder="Confirm your password"
        className="pl-[15px] w-[400px] h-[40px] rounded-md mb-[20px] border border-gray-300"
      />
      {error && <p className="text-red-500 mb-[20px]">{error}</p>}
      <button
        title="SIGN UP"
        onClick={handleSignUp}
        className="w-[200px] h-[30px] rounded-sm bg-blue-300"
      >
        Зарегистрироваться
      </button>
    </div>
  );
};
