"use client";

import { Lato } from "next/font/google";
import { PersistGate } from "redux-persist/integration/react";

import { persistor } from "@redux/store";
import ReduxProvider from "@redux/ReduxProvider";
import WithAuth from "./WithAuth";

import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className} h-screen w-screen flex flex-col`}>
        <ReduxProvider>
          <PersistGate loading={null} persistor={persistor}>
            <WithAuth>{children}</WithAuth>
          </PersistGate>
        </ReduxProvider>
      </body>
    </html>
  );
}
