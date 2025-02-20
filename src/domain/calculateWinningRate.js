export const calculateWinningRate = (price, prize) => {
  const rate = (prize / price) * 100;
  
  if(rate % 1 === 0)return Number(rate.toString());
  return Number(rate.toFixed(2));
};
