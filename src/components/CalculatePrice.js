import React, { useState, useEffect } from "react";
import { calculatePrice } from "../utils/calculateFunctions";

const CalculatePrice = () => {
  const [product, setProduct] = useState({
    code: "",
    name: "",
    purchasePrice: 0,
    taxes: 0,
    profitValue: 0,
  });

  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    try {
      const calculatedPrice = calculatePrice(product);
      if (calculatedPrice < 0) {
        throw new Error("Preço negativo detectado. Verifique os valores digitados.");
      }
      setPrice(calculatedPrice);
    } catch (error) {
      setPrice("Erro: " + error.message);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const clearFields = () => {
    setProduct({ code: "", name: "", purchasePrice: 0, taxes: 0, profitValue: 0 });
    setPrice(0);
    setIsEditing(false);
    setEditIndex(null);
  };

  const addProductToList = () => {
    if (!product.name || price <= 0) {
      alert("Preencha o nome do produto e verifique os valores!");
      return;
    }

    const newProduct = { ...product, price };
    setProducts([...products, newProduct]);
    clearFields();
  };

  const editProduct = () => {
    if (!product.name || price <= 0) {
      alert("Preencha o nome do produto e verifique os valores!");
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[editIndex] = { ...product, price };
    setProducts(updatedProducts);
    clearFields();
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    const prodToEdit = products[index];
    setProduct({
      code: prodToEdit.code,
      name: prodToEdit.name,
      purchasePrice: prodToEdit.purchasePrice,
      taxes: prodToEdit.taxes,
      profitValue: prodToEdit.profitValue,
    });
    setPrice(prodToEdit.price);
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const clearProductList = () => {
    setProducts([]);
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Código", "Nome", "Preço de Custo", "Impostos", "Margem de Lucro", "Preço Final"],
      ...products.map((prod) => [
        prod.code,
        prod.name,
        prod.purchasePrice,
        prod.taxes,
        prod.profitValue,
        prod.price,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "produtos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importFromCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target.result;
      const lines = csv.split("\n").slice(1); // Remove cabeçalhos
      const importedProducts = lines.map((line) => {
        const [code, name, purchasePrice, taxes, profitValue, price] = line.split(",");
        return {
          code,
          name,
          purchasePrice: parseFloat(purchasePrice),
          taxes: parseFloat(taxes),
          profitValue: parseFloat(profitValue),
          price: parseFloat(price),
        };
      });
      setProducts([...products, ...importedProducts]);
    };
    reader.readAsText(file);
  };

  const printLabels = () => {
    const labelsContent = products
      .map(
        (prod) =>
          `Produto: ${prod.name}\nPreço: R$ ${prod.price.toFixed(
            2
          )}\n----------------------`
      )
      .join("\n");

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${labelsContent}</pre>`);
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen p-4 bg-gray-50">
      {/* Calculadora */}
      <div className="w-full md:w-1/2 flex flex-col items-center p-4">
        <h1 className="text-3xl font-semibold mb-4">Calcular Preço de Produto/Serviço</h1>
        <form className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Código</label>
            <input
              type="text"
              name="code"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.code}
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.name}
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700">Preço de Custo</label>
            <input
              type="number"
              name="purchasePrice"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.purchasePrice}
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700">Impostos</label>
            <input
              type="number"
              name="taxes"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.taxes}
              onChange={handleChange}
            />

            <label className="block text-sm font-medium text-gray-700">Margem de Lucro</label>
            <input
              type="number"
              name="profitValue"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.profitValue}
              onChange={handleChange}
            />

            <div className="mt-4">
              <p className="text-gray-800 font-semibold">
                Valor do Produto: {typeof price === "string" ? price : `R$ ${price.toFixed(2)}`}
              </p>
              <div className="flex space-x-4 mt-4">
                {isEditing ? (
                  <button
                    type="button"
                    onClick={editProduct}
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                  >
                    Editar Produto
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={addProductToList}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Adicionar Produto
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearFields}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Limpar Campos
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Lista de Produtos */}
      <div className="w-full md:w-1/2 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Lista de Produtos</h2>
          <button
            onClick={clearProductList}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Limpar Lista
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
          <button
            onClick={exportToCSV}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Exportar CSV
          </button>
          <label className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer">
            Importar CSV
            <input
              type="file"
              accept=".csv"
              onChange={importFromCSV}
              className="hidden"
            />
          </label>
          <button
            onClick={printLabels}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Imprimir Etiquetas
          </button>
        </div>

        <ul className="bg-white rounded shadow-md p-4 space-y-2">
          {products.length === 0 ? (
            <p className="text-gray-600">Nenhum produto adicionado.</p>
          ) : (
            products.map((prod, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <strong>{prod.name}</strong> - R$ {prod.price.toFixed(2)}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteProduct(index)}
                    className="text-red-500 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalculatePrice;