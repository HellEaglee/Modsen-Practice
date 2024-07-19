"use client";

import AuthPage from "@/containers/AuthPage/AuthPage";
import ReduxProvider from "@/store/redux-provider";
import React from "react";

const page = () => {
  return (
    <ReduxProvider>
      <AuthPage />
    </ReduxProvider>
  );
};

export default page;
