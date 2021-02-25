export function isInputsEmpty(numbers) {
  return numbers.some(number => number === 0);
}

export function isNumbersDuplicated(numbers) {
  const set = new Set(numbers);
  return numbers.length !== set.size;
}
