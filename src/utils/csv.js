export const exportToCSV = (products) => {
  if (!products || products.length === 0) {
    alert("Nenhum produto disponível para exportação.");
    return;
  }

  const csvRows = [
    ["Codigo", "Nome", "Preco de Custo", "Impostos", "Margem de Lucro", "Preco Final", "Estoque"],
    ...products.map((prod) => [
      prod.code,
      prod.name,
      parseFloat(prod.purchasePrice).toFixed(2),
      parseFloat(prod.taxes).toFixed(2),
      parseFloat(prod.profitValue).toFixed(2),
      parseFloat(prod.price).toFixed(2),
      prod.quantity,
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

export const importFromCSV = (e, setProducts) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
      const csv = event.target.result;
      const lines = csv.split("\n").slice(1);
      const importedProducts = lines.map((line) => {
          const [code, name, purchasePrice, taxes, profitValue, price, quantity] = line.split(",");
          return {
              code,
              name,
              purchasePrice: parseFloat(purchasePrice) || 0,
              taxes: parseFloat(taxes) || 0,
              profitValue: parseFloat(profitValue) || 0,
              price: parseFloat(price) || 0,
              quantity: parseInt(quantity) || 0
          };
      });

      setProducts((prevProducts) => [...prevProducts, ...importedProducts]);
  };

  reader.readAsText(file);

  e.target.value = "";
};