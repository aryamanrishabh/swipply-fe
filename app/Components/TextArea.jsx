import React from "react";

const TextArea = (props) => {
  return (
    <textarea
      {...props}
      className={`border-[1px] border-gray-400 rounded p-4 outline-none min-w-96 min-h-24 ${props?.className}`}
    />
  );
};

export default TextArea;
