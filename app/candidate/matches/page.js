"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";

import TextInput from "@/Components/TextInput";
import axiosInstance from "@/axiosInstance";
import urls from "@/constants/urls";
import { CANDIDATE } from "@/constants";
import { useSelector } from "react-redux";

const MatchCard = () => {
  return (
    <div className="flex items-center w-full py-4 px-6 gap-x-4 border-b-2 cursor-pointer hover:bg-gray-100">
      <div className="flex h-20 w-20 rounded-full overflow-hidden bg-gray-200"></div>

      <div className="flex flex-col gap-y-1">
        <h2 className="text-lg font-semibold">Amazon</h2>
        <span className="text-sm text-gray-500">
          Congratulations on getting
        </span>
      </div>
    </div>
  );
};

const CandidateMatchesPage = () => {
  const user = useSelector((state) => state?.auth?.user);

  const [matches, setMatches] = useState(null);

  useEffect(() => {
    getAllMatches();
  }, []);

  const getAllMatches = async () => {
    try {
      // if(!user?.id) return;
      const id = "6769";

      const res = await axiosInstance.get(
        `${urls.match}?userId=${id}&type=${CANDIDATE}`
      );
    } catch (error) {}
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-1/3 border-r-2">
        <div className="flex flex-col w-full h-40 px-6 py-8 gap-y-6 border-b-2">
          <h1 className="text-xl font-bold tracking-wide">Matches</h1>

          <TextInput placeholder="Search" />
        </div>

        <div className="flex flex-col overflow-auto max-h-[calc(100% - 10rem)]">
          <MatchCard />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-y-16 p-8 max-h-full overflow-auto"></div>
    </div>
  );
};

export default CandidateMatchesPage;
