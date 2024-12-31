import React, { useState } from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(""); // Opção de ordenação
  const itemsPerPage = 25;

  // Ordena os produtos com base na opção selecionada
  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      if (sortOption === "code") {
        return a.code.localeCompare(b.code);
      } else if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "quantity") {
        return (b.quantity || 0) - (a.quantity || 0);
      } else if (sortOption === "price") {
        return b.price - a.price;
      } else if (sortOption === "stock") {
        return b.purchasePrice - a.purchasePrice; // Exemplo: ordenação por preço de custo
      }
      return 0; // Sem ordenação
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset para a primeira página ao realizar uma nova busca
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filtra e ordena os produtos
  const filteredProducts = sortProducts(
    products.filter((product) => {
      const lowerCaseTerm = searchTerm.toLowerCase();
      return (
        (product.name?.toLowerCase().includes(lowerCaseTerm) || false) ||
        (product.code?.toLowerCase().includes(lowerCaseTerm) || false)
      );
    })
  );

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
      {/* Campo de busca e dropdown de ordenação */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nome ou código"
          value={searchTerm}
          onChange={handleSearch}
          className="w-3/4 p-2 border border-gray-300 rounded"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Ordenar por...</option>
          <option value="code">Código</option>
          <option value="name">Nome</option>
          <option value="quantity">Quantidade</option>
          <option value="price">Valor</option>
          <option value="stock">Estoque</option>
        </select>
      </div>

      {/* Tabela de produtos */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Código</th>
              <th className="border border-gray-300 px-4 py-2">Nome</th>
              <th className="border border-gray-300 px-4 py-2">Preço</th>
              <th className="border border-gray-300 px-4 py-2">Quantidade</th>
              <th className="border border-gray-300 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-600 py-4">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              currentProducts.map((prod, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {prod.code}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {prod.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    R$ {prod.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {prod.quantity}
                  </td>
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

      {/* Paginação */}
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
