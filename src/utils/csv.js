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

export const importFromCSV2 = (e, setProducts) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const csv = event.target.result;
    const lines = csv.trim().split("\n");

    const header = lines[0].split(",");
    const expectedHeader = [
      "Codigo",
      "Nome",
      "Preco de Custo",
      "Impostos",
      "Margem de Lucro",
      "Preco Final",
      "Estoque",
    ];
    if (header.length !== expectedHeader.length || !header.every((col, i) => col.trim() === expectedHeader[i])) {
      alert("O cabeçalho do arquivo CSV é inválido. Verifique se as colunas estão corretas.");
      return;
    }

    // Processa as linhas restantes
    const importedProducts = [];
    const errors = [];
    lines.slice(1).forEach((line, index) => {
      const [code, name, purchasePrice, taxes, profitValue, price, quantity] = line.split(",");

      // Validação dos campos
      if (!code || !name || isNaN(parseFloat(purchasePrice)) || isNaN(parseFloat(taxes)) ||
          isNaN(parseFloat(profitValue)) || isNaN(parseFloat(price)) || isNaN(parseInt(quantity))) {
        errors.push(`Erro na linha ${index + 2}: Dados inválidos ou ausentes.`);
        return;
      }

      importedProducts.push({
        code: code.trim(),
        name: name.trim(),
        purchasePrice: parseFloat(purchasePrice),
        taxes: parseFloat(taxes),
        profitValue: parseFloat(profitValue),
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
    });

    // Exibe erros, se houver
    if (errors.length > 0) {
      alert(errors.join("\n"));
    }

    // Atualiza os produtos
    if (importedProducts.length > 0) {
      setProducts((prevProducts) => [...prevProducts, ...importedProducts]);
    }
  };

  reader.readAsText(file);

  // Limpa o input para permitir nova importação
  e.target.value = "";
};
