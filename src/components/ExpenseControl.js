import { useEffect, useState } from "react";
import ExpenseModal from "./modals/ExpenseModal";

const ExpenseControl = () => {
    const [expenses, setExpenses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("date");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25;
  
    // Carregar despesas do cache na inicialização
    useEffect(() => {
      const cachedExpenses = localStorage.getItem("expenses");
      if (cachedExpenses) {
        setExpenses(JSON.parse(cachedExpenses));
      }
    }, []);
  
    // Salvar despesas no cache sempre que forem atualizadas
    useEffect(() => {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);
  
    const handleSaveExpense = (expense) => {
      setExpenses([...expenses, expense]);
    };
  
    const handleDeleteExpense = (index) => {
      setExpenses(expenses.filter((_, i) => i !== index));
    };
  
    const filteredExpenses = expenses
      .filter((exp) => {
        const matchesTitle = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = startDate && endDate
          ? new Date(exp.date) >= new Date(startDate) && new Date(exp.date) <= new Date(endDate)
          : true;
        return matchesTitle && matchesDate;
      })
      .sort((a, b) => {
        if (sortOption === "date") {
          return new Date(a.date) - new Date(b.date);
        } else {
          return parseFloat(a.amount) - parseFloat(b.amount);
        }
      });
  
    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);
  
    const handlePageChange = (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };
  
    return (
      <div className="min-h-screen p-4 space-y-4">
        <h1 className="text-3xl text-white font-semibold mb-4">Controle de Despesas</h1>
  
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por título"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            placeholder="Data inicial"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            placeholder="Data final"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="date">Ordenar por Data</option>
            <option value="amount">Ordenar por Valor</option>
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Nova Despesa
          </button>
        </div>
  
        <div className="bg-white rounded shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Lista de Despesas</h2>
          {paginatedExpenses.length === 0 ? (
            <p className="text-gray-600">Nenhuma despesa encontrada.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Título</th>
                  <th className="border border-gray-300 px-4 py-2">Descrição</th>
                  <th className="border border-gray-300 px-4 py-2">Valor (R$)</th>
                  <th className="border border-gray-300 px-4 py-2">Data</th>
                  <th className="border border-gray-300 px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExpenses.map((exp, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{exp.title}</td>
                    <td className="border border-gray-300 px-4 py-2">{exp.description}</td>
                    <td className="border border-gray-300 px-4 py-2">R$ {parseFloat(exp.amount).toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">{exp.date}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleDeleteExpense(index + startIndex)}
                        className="text-red-500 hover:underline"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
  
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
  
        <ExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveExpense}
        />
      </div>
    );
  };
  
export default ExpenseControl;