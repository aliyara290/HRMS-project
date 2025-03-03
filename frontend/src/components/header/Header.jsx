import React from "react";

const Header = () => {
  return (
    <div className="relative w-full">
      <div className="fixed top-0 left-0 z-48 w-full h-13 bg-gray-800 px-6 flex items-center justify-end border-b-1 border-gray-700">
        <span className="text-gray-300">Welcome Ali</span>
      </div>
    </div>
  );
};

export default Header;
