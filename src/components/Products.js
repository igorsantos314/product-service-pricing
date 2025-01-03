import React, { useState, useEffect } from "react";
import { calculatePrice, calculateProfitMargin } from "../utils/calculateFunctions";
import PrintLabels from "./modals/PrintLabelsModal";
import ProductList from "./widgets/ProductList";

const Products = () => {
  const [product, setProduct] = useState({
    code: "",
    name: "",
    purchasePrice: 0,
    taxes: 0,
    profitValue: 0,
    price: 0.00,
    quantity: 0,
  });

  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [lastEditedField, setLastEditedField] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const cachedProducts = localStorage.getItem("products");
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    }
    setIsInitialLoad(false); // Inicialização completa
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, isInitialLoad]);

  useEffect(() => {
    try {
      if (lastEditedField === "profitValue") {
        const calculatedPrice = calculatePrice(product).toFixed(2);
        if (calculatedPrice < 0) {
          throw new Error("Preço negativo detectado. Verifique os valores digitados.");
        }
        setPrice(calculatedPrice);
      } else if (lastEditedField === "price") {
        const costPrice = parseFloat(product.purchasePrice) + parseFloat(product.taxes);
        const profitValue = calculateProfitMargin(costPrice, price).toFixed(2);
  
        if (product.profitValue !== profitValue) {
          setProduct((prev) => ({ ...prev, profitValue: profitValue }));
        }
      }
    } catch (error) {
      setPrice("Erro: " + error.message);
    }

    // eslint-disable-next-line
  }, [product.purchasePrice, product.taxes, price, product.profitValue, lastEditedField]);  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({ ...prev, [name]: value }));
    if (name === "profitValue" || name === "price") {
      setLastEditedField(name);
    }
  };

  const clearFields = () => {
    setProduct({
      code: "",
      name: "",
      purchasePrice: 0,
      taxes: 0,
      profitValue: 0,
      price: 0,
      quantity: 0,
    });
    setPrice(0);
    setIsEditing(false);
    setEditIndex(null);
    setLastEditedField("");
  };

  const addProductToList = () => {
    if (!product.name || price <= 0) {
      alert("Preencha o nome do produto e verifique os valores!");
      return;
    }

    const newProduct = { ...product, price: parseFloat(price) };
    setProducts([...products, newProduct]);
    clearFields();
  };

  const editProduct = () => {
    if (!product.name || price <= 0) {
      alert("Preencha o nome do produto e verifique os valores!");
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[editIndex] = { ...product, price: parseFloat(price) };
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
      purchasePrice: parseFloat(prodToEdit.purchasePrice).toFixed(2),
      taxes: parseFloat(prodToEdit.taxes).toFixed(2),
      profitValue: parseFloat(prodToEdit.profitValue).toFixed(2),
      price: parseFloat(prodToEdit.price).toFixed(2),
      quantity: prodToEdit.quantity || 0,
    });

    setPrice(prodToEdit.price);
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const clearProductList = () => {
    setProducts([]);
  };

  const openPrintLabelsModal = () => {
    setIsModalOpen(true);
  };

  const closePrintLabelsModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full p-4">
      {/* Print Labels */}
      {
        isModalOpen ? ( <PrintLabels products={products} onClose={closePrintLabelsModal} />) : null
      }
      
      {/* Calculadora */}
      <div className="w-full md:w-1/2 flex flex-col items-center p-4">
        <h1 className="text-3xl text-black font-semibold mb-4">Adicionar Produto/Serviço</h1>
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

            <label className="block text-sm font-medium text-gray-700">Preço de Venda (R$)</label>
            <input
              type="number"
              name="price"
              className="w-full p-2 border border-gray-300 rounded"
              value={price}
              onChange={(e) => {
                setPrice(parseFloat(e.target.value));
                setLastEditedField("price");
              }}
            />

            <label className="block text-sm font-medium text-gray-700">Margem de Lucro (%)</label>
            <input
              type="number"
              name="profitValue"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.profitValue}
              onChange={(e) => {
                setLastEditedField("profitValue");
                handleChange(e);
              }}
            />

            <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
            <input
              type="number"
              name="quantity"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.quantity}
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
          <h2 className="text-2xl text-black font-semibold">Lista de Produtos</h2>
          <button
            onClick={clearProductList}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Limpar Lista
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
          <button
            onClick={openPrintLabelsModal}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Imprimir Etiquetas
          </button>
        </div>
        
        <ProductList products={products} onDelete={deleteProduct} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Products;
