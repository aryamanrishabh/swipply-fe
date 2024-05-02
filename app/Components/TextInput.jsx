import React from "react";

const TextInput = (props) => {
  return (
    <input
      {...props}
      className={`border-[1px] rounded outline-none py-2 px-3 text-sm min-w-80 border-gray-400 ${props?.className}`}
    />
  );
};

export default TextInput;
