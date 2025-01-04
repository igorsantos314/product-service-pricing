import React, { useState } from "react";

const Settings = () => {
  const [importStatus, setImportStatus] = useState("");

  const handleExport = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const database = {
      products,
      sales,
      expenses,
    };

    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(database, null, 2)
    )}`;
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "database.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        if (data.products && data.sales && data.expenses) {
          localStorage.setItem("products", JSON.stringify(data.products));
          localStorage.setItem("sales", JSON.stringify(data.sales));
          localStorage.setItem("expenses", JSON.stringify(data.expenses));
          setImportStatus("Importação bem-sucedida!");
        } else {
          throw new Error("Formato de arquivo inválido.");
        }
      } catch (error) {
        setImportStatus(`Erro ao importar: ${error.message}`);
      }
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>

      {/* Exportar Banco de Dados */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Exportar Banco de Dados</h2>
        <p className="text-gray-700 mb-4">
          Faça o download do banco de dados completo no formato <strong>.json</strong>.
        </p>
        <button
          onClick={handleExport}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Exportar Banco de Dados
        </button>
      </div>

      {/* Importar Banco de Dados */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Importar Banco de Dados</h2>
        <p className="text-gray-700 mb-4">
          Selecione um arquivo <strong>.json</strong> para importar dados no formato correto.
        </p>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="block mb-4"
        />
        {importStatus && (
          <p className={`text-sm ${importStatus.includes("Erro") ? "text-red-500" : "text-green-500"}`}>
            {importStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Settings;
