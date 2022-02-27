export function isInRange(arr, min, max) {
  return arr.every((item) => item >= min && item <= max);
}

export function isDuplicated(arr) {
  const set = new Set(arr);
  return set.size === arr.length;
}
