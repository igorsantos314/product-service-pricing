import React, { useState } from "react";

const PrintLabels = ({ products, onClose }) => {
  const [config, setConfig] = useState({
    showBorder: true,
    borderColor: 'black',
    fontSize: 14,
    fontColor: 'black',
    includeCode: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prevConfig => ({
      ...prevConfig,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePrint = () => {
    const content = document.getElementById("labels-content").innerHTML;
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
          <div>${content}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-3/4 max-w-2xl z-50">
        <h2 className="text-lg font-bold mb-4">Product Labels</h2>
        
        {/* Configuração da UI */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <label>Show Border:</label>
            <input 
              className="w-5 h-5"
              type="checkbox" 
              name="showBorder" 
              checked={config.showBorder}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between mb-2">
            <label>Border Color:</label>
            <input 
              type="color" 
              name="borderColor" 
              value={config.borderColor}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between mb-2">
            <label>Font Size:</label>
            <input 
              type="range" 
              name="fontSize" 
              min="10" 
              max="30" 
              value={config.fontSize}
              onChange={handleChange}
            />
            <span>{config.fontSize}px</span>
          </div>
          <div className="flex justify-between mb-2">
            <label>Font Color:</label>
            <input 
              type="color" 
              name="fontColor" 
              value={config.fontColor}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between mb-2">
            <label>Include Code:</label>
            <input 
              className="w-5 h-5"
              type="checkbox" 
              name="includeCode" 
              checked={config.includeCode}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {/* Exibição das labels */}
        <div className="" id="labels-content">
          {products.map((product, index) => (
            <div className="label mt-8" key={index}>
              <p><strong>{product.name}</strong></p>
              <p>R$ {typeof product.price === "string" ? product.price : `${product.price.toFixed(2)}`}</p>
              {config.includeCode && <p>Code: {product.code}</p>}
            </div>
          ))}
        </div>

        {/* Botões */}
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Print
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintLabels;