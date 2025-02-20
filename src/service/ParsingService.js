export const parsePrice = (priceInput) => {
  return Number(priceInput);
};
export const parseWinningNumbers = (winningNumberInput) => {
  return winningNumberInput.split(",").map(Number);
};

export const parseBonusNumber = (bonusNumberInput) => {
  return Number(bonusNumberInput);
};
