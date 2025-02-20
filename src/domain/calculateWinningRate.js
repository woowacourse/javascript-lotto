export const calculateWinningRate = (price, prize) => {
  return ((prize / price) * 100).toFixed(2);
};
