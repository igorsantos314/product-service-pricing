import React, { useState, useEffect } from "react";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("date");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  // Carregar vendas do localStorage ao montar o componente
  useEffect(() => {
    const cachedSales = localStorage.getItem("sales");
    if (cachedSales) {
      const parsedSales = JSON.parse(cachedSales);
      setSales(parsedSales);
      setFilteredSales(parsedSales);
    }
  }, []);

  const handleFilter = () => {
    let filtered = sales;
  
    // Converta startDate e endDate para objetos Date para comparação
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;
  
    // Filtro por data de início
    if (start) {
      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.date).getTime();
        return saleDate >= start;
      });
    }
  
    // Filtro por data final
    if (end) {
      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.date).getTime();
        return saleDate <= end;
      });
    }
  
    // Ordenação
    filtered = [...filtered].sort((a, b) => {
      if (sortField === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortField === "total") {
        return a.total - b.total;
      }
      return 0;
    });
  
    setFilteredSales(filtered);
    setCurrentPage(1); // Resetar para a primeira página
  };  

  const handleDeleteSale = (saleIndex) => {
    if (window.confirm("Tem certeza que deseja excluir esta venda?")) {
      const updatedSales = sales.filter((_, index) => index !== saleIndex);
      setSales(updatedSales);
      setFilteredSales(updatedSales);
      localStorage.setItem("sales", JSON.stringify(updatedSales));
      setIsModalOpen(false);
    }
  };

  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSales = filteredSales.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Lista de Compras</h1>

      {/* Filtros */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data Inicial</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data Final</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ordenar por</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="date">Data</option>
            <option value="total">Valor</option>
          </select>
        </div>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-end"
        >
          Filtrar
        </button>
      </div>

      {/* Tabela de Vendas */}
      <table className="min-w-full table-auto border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Data</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentSales.map((sale, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                {new Date(sale.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">R$ {sale.total.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    setSelectedSale(sale);
                    setIsModalOpen(true);
                  }}
                  className="bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600"
                >
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <p>Página {currentPage} de {totalPages}</p>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>

      {/* Modal de Detalhes */}
      {isModalOpen && selectedSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg overflow-y-auto max-h-screen relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Detalhes da Venda</h2>
            <p><strong>Data:</strong> {new Date(selectedSale.date).toLocaleString()}</p>
            <p><strong>Total:</strong> R$ {selectedSale.total.toFixed(2)}</p>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold">Itens</h3>
            <ul className="space-y-2">
              {selectedSale.items.map((item, idx) => (
                <li key={idx} className="border-b py-2">
                  {item.name} - Qtd: {item.quantity} - R$ {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => handleDeleteSale(sales.indexOf(selectedSale))}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Excluir Venda
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesList;
