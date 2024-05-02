import React from "react";

const Body = ({ children }) => {
  return (
    <div
      className="flex flex-1 max-w-full"
      style={{ maxHeight: "calc(100vh - 8rem)" }}
    >
      {children}
    </div>
  );
};

export default Body;
