import React from "react";
import { GoOrganization } from "react-icons/go";

import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";

const page = () => {
  return (
    <div className="flex flex-1 p-12 items-start justify-between max-h-full overflow-auto">
      <div className="flex flex-col gap-y-12 w-2/5">
        <div className="flex flex-col gap-y-2">
          <label className="label">Company Name</label>
          <TextInput className="max-w-40" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="label">Company Website URL</label>
          <TextInput className="max-w-40" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="label">Industry Sector</label>
          <TextInput className="max-w-40" />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="label">About</label>
          <TextArea />
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl font-semibold">Contact Person Details:</h2>

          <div className="flex flex-col gap-y-2">
            <label className="label">Name</label>
            <TextInput className="max-w-40" />
          </div>

          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Email</label>
              <TextInput className="max-w-40" />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Phone Number</label>
              <TextInput className="max-w-40" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-32 w-32 rounded-full bg-gray-500 items-center justify-center cursor-pointer relative overflow-hidden">
        <GoOrganization color="white" size="4.5rem" />
        <div className="flex opacity-0 transition w-full h-full absolute backdrop-brightness-50 hover:opacity-85 items-center justify-center">
          <span className="text-xl font-semibold text-white">
            Upload <br /> Picture
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
