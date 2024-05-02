import React from "react";
import { IoFilterSharp } from "react-icons/io5";

import TextInput from "@/Components/TextInput";

const Match = () => (
  <div className="flex gap-x-6 items-center max-w-full px-6 py-4 border-b-2 cursor-pointer hover:bg-gray-100">
    <div className="min-h-20 min-w-20 rounded-full bg-gray-500 overflow-hidden"></div>

    <div className="flex flex-1 items-end justify-between">
      <div className="flex flex-col gap-y-1 max-w-[75%]">
        <h2 className="text-lg font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
          Company/Candidate Name
        </h2>
        <span className="text-sm text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden">
          Congratulations on getting shortlisted, this is a test message
        </span>
      </div>

      <span className="text-xs">9:00 AM</span>
    </div>
  </div>
);

const MatchesPage = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-1/3 border-r-2">
        <div className="flex flex-col w-full h-40 px-6 py-8 gap-y-8 border-b-2">
          <h1 className="text-xl font-bold tracking-wide">Matches</h1>

          <div className="flex items-center gap-x-8">
            <TextInput placeholder="Search" className="w-full" />

            <IoFilterSharp size="1.5rem" className="cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col overflow-auto max-h-[calc(100% - 10rem)]">
          <Match />
          <Match />
          <Match />
          <Match />
          <Match />
          <Match />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-y-16 p-8 max-h-full overflow-auto"></div>
    </div>
  );
};

export default MatchesPage;
