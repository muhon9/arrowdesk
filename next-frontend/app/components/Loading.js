import React from "react";

const Loading = ({ size = 35 }) => {
  return (
    <div className="w-screen h-screen grid items-center justify-center">
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="animate-spin flex justify-center items-center"
      >
        <div
          className="h-full w-full border-4 border-t-red-800
       border-b-red-700 rounded-[50%]"
        ></div>
      </div>
    </div>
  );
};

export default Loading;
