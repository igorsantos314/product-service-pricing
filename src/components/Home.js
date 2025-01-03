import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Bem-vindo ao Venda Fácil!</h1>
        <p className="text-gray-700 text-lg mb-6">
          O <span className="font-semibold text-blue-600">Venda Fácil</span> é a solução ideal para pequenos e médios
          comerciantes que buscam praticidade e eficiência na gestão de vendas e estoque.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-blue-600">Gestão de Produtos</h3>
            <p className="text-gray-600 text-sm mt-2">
              Organize seus produtos, atualize preços e mantenha o controle de estoque de forma simples e prática.
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-blue-600">Ponto de Venda (PDV)</h3>
            <p className="text-gray-600 text-sm mt-2">
              Realize vendas de maneira ágil e gere recibos não fiscais para seus clientes.
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-blue-600">Relatórios de Vendas</h3>
            <p className="text-gray-600 text-sm mt-2">
              Acompanhe o histórico de vendas com filtros por data, valores e mais.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Por que escolher o Venda Fácil?</h2>
          <ul className="text-left space-y-2 text-gray-700">
            <li>✅ Sistema rápido e intuitivo.</li>
            <li>✅ Perfeito para otimizar seu tempo.</li>
            <li>✅ Controle completo sobre produtos e vendas.</li>
            <li>✅ Ideal para pequenos e médios negócios.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
