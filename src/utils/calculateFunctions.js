export const calculatePrice = ({ purchasePrice, taxes, profitValue }) => {
    const basePrice = parseFloat(purchasePrice) + parseFloat(taxes);
    return basePrice / (1 - (parseFloat(profitValue) / 100));
  };