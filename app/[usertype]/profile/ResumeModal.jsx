import React from "react";

const ResumeModal = ({ children }) => {
  return (
    <div className="absolute flex items-center justify-center h-screen w-screen backdrop-brightness-75 z-50 top-0 left-0">
      <div className="flex p-6 bg-white rounded-lg min-w-96">{children}</div>
    </div>
  );
};

export default ResumeModal;
