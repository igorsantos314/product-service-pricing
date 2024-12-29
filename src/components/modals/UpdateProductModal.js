import React, { useState } from "react";

const UpdateProductModal = ({
  product,
  setProduct,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [editable, setEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Atualizar Produto</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Código</label>
            <input
              type="text"
              name="code"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.code}
              disabled={!editable}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.name}
              disabled={!editable}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preço de Custo</label>
            <input
              type="number"
              name="purchasePrice"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.purchasePrice}
              disabled={!editable}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantidade</label>
            <input
              type="number"
              name="quantity"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            {!editable && (
              <button
                type="button"
                onClick={() => setEditable(true)}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
            )}
            {editable && (
              <button
                type="button"
                onClick={onUpdate}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Atualizar Estoque
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;