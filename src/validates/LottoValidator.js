export function isArrayInLength(array, length) {
  return array.length === length;
}

export function isArrayUnique(array) {
  const uniqueSet = new Set(array);
  return uniqueSet.size === array.length;
}

export function isNumberInArray(number, array) {
  return array.includes(number);
}
