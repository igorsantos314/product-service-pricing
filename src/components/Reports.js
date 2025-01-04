import React, { useState, useEffect } from "react";

const Reports = () => {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [averageTicket, setAverageTicket] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Carregar vendas e despesas do localStorage ao montar o componente
  useEffect(() => {
    const cachedSales = localStorage.getItem("sales");
    if (cachedSales) {
      setSales(JSON.parse(cachedSales));
    }

    const cachedExpenses = localStorage.getItem("expenses");
    if (cachedExpenses) {
      setExpenses(JSON.parse(cachedExpenses));
    }
  }, []);

  const calculateMetrics = (filteredSales, filteredExpenses) => {
    const totalRevenue = filteredSales.reduce((acc, sale) => acc + sale.total, 0);
    const totalProductsSold = filteredSales.reduce(
      (acc, sale) =>
        acc + sale.items.reduce((prodAcc, item) => prodAcc + item.quantity, 0),
      0
    );
    const totalSales = filteredSales.length;
    const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

    const totalExpenses = filteredExpenses.reduce(
      (acc, expense) => acc + parseFloat(expense.amount),
      0
    );

    setTotalRevenue(totalRevenue);
    setTotalProductsSold(totalProductsSold);
    setAverageTicket(averageTicket);
    setTotalSales(totalSales);
    setTotalExpenses(totalExpenses);
  };

  const handleFilter = () => {
    let filteredSales = sales;
    let filteredExpenses = expenses;

    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

    if (start) {
      filteredSales = filteredSales.filter(
        (sale) => new Date(sale.date).getTime() >= start
      );
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.date).getTime() >= start
      );
    }
    if (end) {
      filteredSales = filteredSales.filter(
        (sale) => new Date(sale.date).getTime() <= end
      );
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.date).getTime() <= end
      );
    }

    setFilteredSales(filteredSales);
    setFilteredExpenses(filteredExpenses);
    calculateMetrics(filteredSales, filteredExpenses);
    setCurrentPage(1); // Resetar para a primeira página
  };

  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSales = filteredSales.slice(startIndex, startIndex + itemsPerPage);
  const currentExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(
    Math.max(filteredSales.length, filteredExpenses.length) / itemsPerPage
  );

  return (
    <div className="min-h-screen p-4">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold text-blue-600">Receita Total</h3>
          <p className="text-gray-700 text-2xl">R$ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold text-blue-600">Despesas Totais</h3>
          <p className="text-gray-700 text-2xl">R$ {totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold text-blue-600">Lucro Líquido</h3>
          <p className="text-gray-700 text-2xl">R$ {(totalRevenue - totalExpenses).toFixed(2)}</p>
        </div>
      </div>

      {/* Lista de Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {currentSales.map((sale, index) => (
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

        <div>
          <h2 className="text-xl font-semibold mb-4">Despesas no Período</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Data</th>
                <th className="border border-gray-300 px-4 py-2">Descrição</th>
                <th className="border border-gray-300 px-4 py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((expense, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{expense.title}</td>
                  <td className="border border-gray-300 px-4 py-2">R$ {parseFloat(expense.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
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
    </div>
  );
};

export default Reports;
