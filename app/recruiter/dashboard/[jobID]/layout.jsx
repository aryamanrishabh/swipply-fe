import React from "react";
import { FiX, FiCheck } from "react-icons/fi";

const layout = ({ children }) => {
  return (
    <div className="flex flex-1 max-h-full">
      <div className="flex w-1/4 h-full items-center justify-center">
        <div
          style={{
            background:
              "linear-gradient(135deg, #f85032 0%,#f16f5c 25%,#f6290c 51%,#f02f17 71%,#e73827 100%)",
          }}
          className="flex w-24 h-24 rounded-full items-center justify-center cursor-pointer transition hover:scale-105 hover:shadow-2xl"
        >
          <FiX color="white" size="3rem" strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex w-1/2 h-full py-8 px-12 justify-center">
        <div className="p-8 flex flex-1 border-[1.66px] rounded-2xl max-w-[42rem]">
          {children}
        </div>
      </div>

      <div className="flex w-1/4 h-full items-center justify-center">
        <div
          style={{
            background:
              "linear-gradient(135deg, #b4ddb4 0%,#83c783 25%,#2f9f2f 51%,#1d9b1d 71%,#0b8a0b 100%)",
          }}
          className="flex w-24 h-24 rounded-full items-center justify-center cursor-pointer transition hover:scale-105 hover:shadow-2xl"
        >
          <FiCheck color="white" size="3rem" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default layout;
