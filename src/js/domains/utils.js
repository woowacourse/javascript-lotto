export function generateRandomNumberRange(MIN, MAX) {
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
}
