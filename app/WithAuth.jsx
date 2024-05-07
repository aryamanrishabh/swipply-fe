"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import { accessTokenKey, tokenKey } from "./axiosInstance";

const WithAuth = ({ children }) => {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);

  const isAuthRoute = path?.includes("/login") || path?.includes("/signup");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    let isAuthenticated = false;
    try {
      let authVal = localStorage.getItem(tokenKey);
      authVal = JSON?.parse(authVal);
      isAuthenticated = !!authVal?.[accessTokenKey];
    } catch (error) {}

    setAuthenticated(isAuthenticated);

    if (!isAuthenticated) {
      if (!isAuthRoute) {
        router.replace("/auth/login/candidate");
      }
    }
  };

  if (!authenticated && !isAuthRoute) return <></>;

  return children;
};

export default WithAuth;
