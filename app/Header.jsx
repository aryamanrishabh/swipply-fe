"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();

  if (path?.includes?.("auth")) return null;

  return (
    <div className="flex h-16 min-h-16 items-center justify-center  bg-slate-500">
      Header
    </div>
  );
};

export default Header;
