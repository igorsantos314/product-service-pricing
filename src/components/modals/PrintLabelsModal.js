import React, { useState } from "react";

const PrintLabels = ({ products, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [config, setConfig] = useState({
    showBorder: true,
    borderColor: "black",
    fontSize: 14,
    fontColor: "black",
    includeCode: true,
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = (product) => {
    if (!selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (product) => {
    setSelectedProducts(
      selectedProducts.filter((item) => item.code !== product.code)
    );
  };

  const handleAddAllProducts = () => {
    setSelectedProducts(products);
  };

  const handlePrint = () => {
    const content = selectedProducts.map(
      (product) => `
        <div class="label">
          <p><strong>${product.name}</strong></p>
          <p>R$ ${typeof product.price === "string" ? product.price : product.price.toFixed(2)}</p>
          ${config.includeCode ? `<p>Code: ${product.code}</p>` : ""}
        </div>`
    );

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .label {
              border: ${config.showBorder ? `1px solid ${config.borderColor}` : "none"};
              padding: 10px;
              margin: 10px;
              display: inline-block;
              font-size: ${config.fontSize}px;
              color: ${config.fontColor};
              width: 200px;
            }
          </style>
        </head>
        <body>
          <div>${content.join("")}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      (product.name?.toLowerCase().includes(lowerCaseTerm) || false) ||
      (product.code?.toLowerCase().includes(lowerCaseTerm) || false)
    );
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-3/4 max-w-2xl z-50 max-h-screen overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Configurar Impressão de Etiquetas</h2>

        {/* Caso não haja produtos */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum produto disponível para impressão.</p>
        ) : (
          <>
            {/* Configurações de impressão */}
            <div className="mb-4">
              <div className="flex flex-col space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <label>Exibir Bordas:</label>
                  <input
                    type="checkbox"
                    name="showBorder"
                    checked={config.showBorder}
                    onChange={handleConfigChange}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label>Cor da Borda:</label>
                  <input
                    type="color"
                    name="borderColor"
                    value={config.borderColor}
                    onChange={handleConfigChange}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label>Tamanho da Fonte:</label>
                  <input
                    type="range"
                    name="fontSize"
                    min="10"
                    max="30"
                    value={config.fontSize}
                    onChange={handleConfigChange}
                  />
                  <span>{config.fontSize}px</span>
                </div>
                <div className="flex justify-between items-center">
                  <label>Cor da Fonte:</label>
                  <input
                    type="color"
                    name="fontColor"
                    value={config.fontColor}
                    onChange={handleConfigChange}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label>Incluir Código:</label>
                  <input
                    type="checkbox"
                    name="includeCode"
                    checked={config.includeCode}
                    onChange={handleConfigChange}
                  />
                </div>
              </div>

              {/* Busca de produtos */}
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Buscar produtos por nome ou código"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={handleAddAllProducts}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Adicionar Todos
                </button>
              </div>

              {/* Lista de produtos */}
              {searchTerm && (
                <div className="max-h-40 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.code}
                        className="flex justify-between items-center p-2 border-b"
                      >
                        <span>{product.name}</span>
                        <button
                          onClick={() => handleAddProduct(product)}
                          className="text-blue-500 hover:underline"
                        >
                          Adicionar
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Nenhum produto encontrado.</p>
                  )}
                </div>
              )}
            </div>

            {/* Produtos selecionados */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Produtos Selecionados</h3>
              {selectedProducts.length > 0 ? (
                selectedProducts.map((product) => (
                  <div
                    key={product.code}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span>{product.name}</span>
                    <button
                      onClick={() => handleRemoveProduct(product)}
                      className="text-red-500 hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Nenhum produto selecionado.</p>
              )}
            </div>
          </>
        )}

        {/* Botões de ação */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={selectedProducts.length === 0}
          >
            Imprimir Selecionados
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintLabels;
