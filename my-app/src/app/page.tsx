"use client";

import { UserButton } from "@/components/UserButton/UserButton";
import { Main } from "@/containers/Main/Main";
import ReduxProvider from "@/store/redux-provider";

export default function Home() {
  return (
    <ReduxProvider>
      <Main />
      <UserButton />
    </ReduxProvider>
  );
}
