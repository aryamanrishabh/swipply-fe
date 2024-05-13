"use client";

import React from "react";
import { FiLogOut } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout({ router }));

  if (path?.includes?.("auth")) return null;

  return (
    <div className="flex h-16 min-h-16 px-12 items-center justify-between  bg-blue-500">
      <Image
        priority
        width={100}
        height={100}
        draggable={false}
        className="h-full"
        objectFit="contain"
        alt="Swipply logo"
        src="/assets/swipply-logo.png"
      />

      <FiLogOut
        size="1.5rem"
        color="white"
        cursor="pointer"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Header;
