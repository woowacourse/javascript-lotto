export const parseWinningNumbers = (stringWinningNumbers) => {
  return stringWinningNumbers.split(',').map((winningNumber) => Number(winningNumber.trim()));
};
