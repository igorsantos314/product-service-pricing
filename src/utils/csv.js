export const exportToCSV = (products) => {
    const csvRows = [
      ["Codigo", "Nome", "Preco de Custo", "Impostos", "Margem de Lucro", "Preco Final"],
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

  export const importFromCSV = (e, products, setProducts) => {
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
                purchasePrice: parseFloat(purchasePrice) || 0,
                taxes: parseFloat(taxes) || 0,
                profitValue: parseFloat(profitValue) || 0,
                price: parseFloat(price) || 0,
            };
        });

        setProducts((prevProducts) => [...prevProducts, ...importedProducts]);
    };

    reader.readAsText(file);

    // Limpa o valor do input para permitir carregar o mesmo arquivo novamente
    e.target.value = "";
};