export const parseString = (stringWinningNumbers) => {
  return stringWinningNumbers.split(',').map((winningNumber) => Number(winningNumber.trim()));
};
