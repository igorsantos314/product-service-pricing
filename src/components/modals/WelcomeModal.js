import React, { useEffect, useState } from "react";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal");
    if (!hasSeenModal) {
      setIsOpen(true);
      localStorage.setItem("hasSeenWelcomeModal", "true");
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded shadow-lg p-6 max-w-lg w-11/12 z-50">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo(a)!</h2>
        <p className="text-gray-800 mb-4">
          Esta aplicação foi criada para te ajudar a organizar o estoque e os preços dos seus produtos e serviços. 
        </p>
        <p className="text-gray-800 mb-4">
          Um bom controle é essencial para evitar prejuízos, entender seu negócio e crescer com segurança.
        </p>
        <p className="text-red-600 font-bold mb-4">
          Lembre-se: seus dados são salvos no navegador. Se você limpar o histórico ou desinstalar o navegador, tudo será perdido.
        </p>
        <p className="text-gray-800 mb-4">
          Para proteger suas informações, salve seus produtos regularmente como um arquivo <strong>CSV</strong>.
        </p>
        <button
          onClick={handleClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;