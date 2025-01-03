import React, { useState, useEffect } from "react";

const Reports = () => {
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [averageTicket, setAverageTicket] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  // Carregar vendas do localStorage ao montar o componente
  useEffect(() => {
    const cachedSales = localStorage.getItem("sales");
    if (cachedSales) {
      setSales(JSON.parse(cachedSales));
    }
  }, []);

  const calculateMetrics = (filtered) => {
    const totalRevenue = filtered.reduce((acc, sale) => acc + sale.total, 0);
    const totalProductsSold = filtered.reduce(
      (acc, sale) =>
        acc + sale.items.reduce((prodAcc, item) => prodAcc + item.quantity, 0),
      0
    );
    const totalSales = filtered.length;
    const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

    setTotalRevenue(totalRevenue);
    setTotalProductsSold(totalProductsSold);
    setAverageTicket(averageTicket);
    setTotalSales(totalSales);
  };

  const handleFilter = () => {
    let filtered = sales;

    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

    if (start) {
      filtered = filtered.filter((sale) => new Date(sale.date).getTime() >= start);
    }
    if (end) {
      filtered = filtered.filter((sale) => new Date(sale.date).getTime() <= end);
    }

    setFilteredSales(filtered);
    calculateMetrics(filtered);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>

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
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-end"
        >
          Gerar Relatório
        </button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold text-blue-600">Receita Total</h3>
          <p className="text-gray-700 text-2xl">R$ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold text-blue-600">Produtos Vendidos</h3>
          <p className="text-gray-700 text-2xl">{totalProductsSold}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold text-blue-600">Ticket Médio</h3>
          <p className="text-gray-700 text-2xl">R$ {averageTicket.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold text-blue-600">Total de Vendas</h3>
          <p className="text-gray-700 text-2xl">{totalSales}</p>
        </div>
      </div>

      {/* Lista de Vendas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Vendas no Período</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Data</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Itens Vendidos</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(sale.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">R$ {sale.total.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {sale.items.reduce((acc, item) => acc + item.quantity, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
