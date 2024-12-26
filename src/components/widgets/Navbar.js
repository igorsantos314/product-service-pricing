import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 opacity-100 p-4 w-full top-0 z-20">
      <div className="flex justify-between items-center">
        {/* Logo ou Nome do App */}
        <div className="text-white text-xl font-bold">Price Calculator</div>
        
        {/* Menu Hambúrguer */}
        <button onClick={toggleMenu} className="text-white lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menu */}
      <div
        className={`lg:flex ${isMenuOpen ? "block" : "hidden"} bg-blue-500 lg:bg-transparent lg:w-auto w-full absolute lg:static top-16 left-0 lg:flex-row flex-col items-center`}
      >
        <a
          href="about:https://www.linkedin.com/in/igor-santos-8383941a6/"
          target="_blank"
          without rel="noreferrer"
          className="text-white py-2 px-4 hover:bg-blue-500 lg:hover:bg-transparent"
        >
          Desenvolvedor
        </a>
        <a
          href="#privacy"
          target="_blank"
          className="text-white py-2 px-4 hover:bg-blue-500 lg:hover:bg-transparent"
        >
          Políticas de Privacidade
        </a>
      </div>
    </nav>
  );
};

export default Navbar;