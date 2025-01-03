import React, { useState, useEffect } from "react";

const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [tempCart, setTempCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [amountPaid, setAmountPaid] = useState(0);
  const [change, setChange] = useState(0);

  // Carregar produtos do localStorage ao montar o componente
  useEffect(() => {
    const cachedProducts = localStorage.getItem("products");
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    }
  }, []);

  useEffect(() => {
    // Atualiza o total de itens e preço
    const total = cart.reduce(
      (acc, item) => ({
        totalPrice: acc.totalPrice + item.price * item.quantity,
        totalItems: acc.totalItems + item.quantity,
      }),
      { totalPrice: 0, totalItems: 0 }
    );

    setTotalPrice(total.totalPrice);
    setTotalItems(total.totalItems);
  }, [cart]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const matches = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.code.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredProducts(matches);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.code === product.code);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });

    setQuantity(1); // Resetar quantidade
  };

  const removeFromCart = (code) => {
    setCart((prevCart) => prevCart.filter((item) => item.code !== code));
  };

  const finalizeSale = () => {
    setTempCart(cart);

    const sale = {
      date: new Date().toISOString(),
      items: cart,
      total: totalPrice,
    };

    // Atualiza o estoque de produtos
    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((item) => item.code === product.code);
      if (cartItem) {
        return {
          ...product,
          quantity: product.quantity - cartItem.quantity,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Salva a venda no cache
    const cachedSales = localStorage.getItem("sales");
    const sales = cachedSales ? JSON.parse(cachedSales) : [];
    localStorage.setItem("sales", JSON.stringify([...sales, sale]));

    // Abre o modal de recibo
    setIsReceiptModalOpen(true);

    // Fecha o modal de troco e reseta carrinho
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCart([]);
    setAmountPaid(0);
    setChange(0);
  };

  const calculateChange = () => {
    const calculatedChange = parseFloat(amountPaid) - totalPrice;
    setChange(calculatedChange >= 0 ? calculatedChange : 0);
  };

  const printReceipt = () => {
    const receiptWindow = window.open("", "PRINT", "width=400,height=600");
  
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
  
    const receiptContent = `
      <html>
        <head>
          <style>
            @media print {
              @page {
                size: 80mm auto; /* Largura de cupom fiscal */
                margin: 0;
              }
            }
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 10px;
              width: 80mm; /* Largura do cupom */
            }
            h1 {
              font-size: 18px;
              margin: 0 0 10px;
              text-align: left;
            }
            h2, p {
              font-size: 14px;
              margin: 0 0 5px;
              text-align: left;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
            }
            th, td {
              font-size: 12px;
              text-align: left;
              padding: 4px 0;
            }
            th {
              font-weight: bold;
            }
            .total {
              font-weight: bold;
              font-size: 14px;
              margin-top: 10px;
            }
            .center {
              text-align: center;
            }
            .separator {
              border-top: 1px dashed #000;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <h1>Sistema PDV</h1>
          <p>${formattedDate} ${formattedTime}</p>
          <h2>Recibo de Venda</h2>
          <div class="separator"></div>
          
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${tempCart
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div class="separator"></div>
          <p class="total">Subtotal: R$ ${totalPrice.toFixed(2)}</p>
          <p class="total">Total: R$ ${totalPrice.toFixed(2)}</p>
          <p class="total">Valor Pago: R$ ${amountPaid.toFixed(2)}</p>
          <p class="total">Troco: R$ ${change.toFixed(2)}</p>
          <div class="separator"></div>
          <p class="center">Obrigado pela preferência!</p>
        </body>
      </html>
    `;
  
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.focus();
    receiptWindow.print();
    receiptWindow.close();
  
    // Manter o modal aberto para decidir se a venda será finalizada
  };

  return (
    <div className="min-h-screen p-4 flex flex-col lg:flex-row">
      {/* Área Principal */}
      <div className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-4">PDV - Ponto de Venda</h1>

        {/* Campo de Busca */}
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Buscar produto por nome ou código"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-20 p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Lista de Produtos Filtrados */}
        {filteredProducts.length > 0 && (
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <p className="font-bold mb-2">Resultados da Busca:</p>
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product.code}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p>{product.name}</p>
                    <p>R$ {product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  >
                    Adicionar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Lista de Venda */}
      <div className="w-full lg:w-1/3 p-4 bg-gray-100 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Venda Atual</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Produto</th>
              <th className="border border-gray-300 px-4 py-2">Quantidade</th>
              <th className="border border-gray-300 px-4 py-2">Subtotal</th>
              <th className="border border-gray-300 px-4 py-2">Remover</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.code}>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => removeFromCart(item.code)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Resumo */}
        <div className="mb-4">
          <p>Total de Itens: {totalItems}</p>
          <p>Total: R$ {totalPrice.toFixed(2)}</p>
        </div>
        <button
          onClick={openModal}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          disabled={cart.length === 0}
        >
          Finalizar Venda
        </button>
      </div>

      {/* Modal de Troco */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Finalizar Venda</h2>
            <p className="mb-4">Total: R$ {totalPrice.toFixed(2)}</p>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Pago pelo Cliente
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={amountPaid}
              onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
            />
            <p className="mb-4">Troco: R$ {change.toFixed(2)}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={calculateChange}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Calcular Troco
              </button>
              <button
                onClick={finalizeSale}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Finalizar Venda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Recibo */}
      {isReceiptModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Venda Finalizada</h2>
            <p>Deseja imprimir a nota não fiscal?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={printReceipt}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Imprimir
              </button>
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;
