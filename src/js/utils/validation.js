export function isNumbersDuplicated(numbers) {
  const set = new Set(numbers);
  return numbers.length !== set.size;
}
