export function isMoneyNotInteger(money) {
  return Math.floor(money) !== money;
}

export function isResultInputsEmpty(numbers) {
  return numbers.some(number => number === 0);
}
