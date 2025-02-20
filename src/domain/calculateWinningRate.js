export const calculateWinningRate = (price, prize) => {
  const rate = (prize / price) * 100;
  return Number(rate % 1 === 0 ? rate.toString() : rate.toFixed(2));
};
