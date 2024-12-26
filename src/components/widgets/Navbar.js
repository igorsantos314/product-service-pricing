import React, { useState } from "react";
import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <nav className="opacity-100 p-4 w-full top-0 z-20">
      <div className="ms-10 flex justify-between items-center">
        {/* Logo e Nome do Sistema */}
        <div className="flex items-center bg-white bg-opacity-5 p-2 rounded-md shadow-2xl hover:shadow-lg">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-20 mr-2"
          />
          <span className="text-[#ffffff] text-xl mr-2 font-bold">Price Calculator</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;