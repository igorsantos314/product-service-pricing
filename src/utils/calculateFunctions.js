export const calculatePrice = ({ purchasePrice, taxes, profitValue }) => {
  const basePrice = parseFloat(purchasePrice) + parseFloat(taxes);
  return basePrice / (1 - (parseFloat(profitValue) / 100));
};

export const calculateProfitMargin = (costPrice, sellPrice) => {
  if (sellPrice <= 0) return 0; // Evita divisões por zero ou valores negativos
  return ((sellPrice - costPrice) / sellPrice) * 100;
};