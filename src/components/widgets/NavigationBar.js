import React from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Venda Fácil</h1>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/sale-easy"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-gray-200 hover:text-white"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sale-easy/products"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-gray-200 hover:text-white"
              }
            >
              Produtos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sale-easy/pos"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-gray-200 hover:text-white"
              }
            >
              PDV
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sale-easy/sales"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-gray-200 hover:text-white"
              }
            >
              Lista de Vendas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sale-easy/reports"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-gray-200 hover:text-white"
              }
            >
              Relatórios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sale-easy/settings"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-gray-200 hover:text-white"
              }
            >
              Configurações
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
