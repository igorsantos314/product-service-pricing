import React, { useEffect, useState } from "react";

const ExpenseModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [expense, setExpense] = useState(
      initialData || { title: "", description: "", amount: "", date: "" }
    );
  
    useEffect(() => {
      if (initialData) {
        setExpense(initialData);
      }
    }, [initialData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setExpense((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSave = () => {
      if (!expense.title || !expense.amount || !expense.date) {
        alert("Preencha os campos obrigatórios (Título, Valor e Data)!");
        return;
      }
      onSave(expense);
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">{initialData ? "Editar Despesa" : "Adicionar Nova Despesa"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título *</label>
              <input
                type="text"
                name="title"
                className="w-full p-2 border border-gray-300 rounded"
                value={expense.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                name="description"
                className="w-full p-2 border border-gray-300 rounded"
                value={expense.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valor (R$) *</label>
              <input
                type="number"
                name="amount"
                className="w-full p-2 border border-gray-300 rounded"
                value={expense.amount}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data *</label>
              <input
                type="date"
                name="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={expense.date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ExpenseModal;