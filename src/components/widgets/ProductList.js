import React, { useState } from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredProducts = products.filter((product) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowerCaseTerm) ||
      product.code.toLowerCase().includes(lowerCaseTerm)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white rounded shadow-md p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nome ou código"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Código</th>
              <th className="border border-gray-300 px-4 py-2">Nome</th>
              <th className="border border-gray-300 px-4 py-2">Preço</th>
              <th className="border border-gray-300 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-600 py-4">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              currentProducts.map((prod, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{prod.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{prod.name}</td>
                  <td className="border border-gray-300 px-4 py-2">R$ {prod.price.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => onEdit(index + startIndex)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(index + startIndex)}
                      className="text-red-500 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ProductList;