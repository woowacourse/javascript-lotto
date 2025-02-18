export const parseWinningNumbers = (stringWinningNumbers) => {
  const test = stringWinningNumbers.split(',').map((winningNumber) => Number(winningNumber.trim()));
  return test;
};
