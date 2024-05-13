import Loader from "@/Components/Loader";
import React from "react";
import { FiX } from "react-icons/fi";
import { GiArtificialHive } from "react-icons/gi";

const RecomModal = ({ data, loading, toggleModal = () => {} }) => {
  return (
    <div className="absolute flex items-center justify-center h-screen w-screen backdrop-brightness-75 z-50 top-0 left-0">
      <div className="w-1/2 p-6 bg-white rounded-lg flex flex-col gap-y-6 items-center relative">
        <GiArtificialHive size="3rem" />

        <FiX
          size="1.5rem"
          cursor="pointer"
          className="absolute top-6 right-6"
          onClick={toggleModal}
        />

        {loading ? (
          <div className="flex flex-1 min-h-32 items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="max-h-96 overflow-auto">
            <p className="tracking-wider text-gray-700 text-justify">{data}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecomModal;
