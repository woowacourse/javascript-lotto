export function getRandomNumberInRange(min = 1, max = 45) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getLottoNumberArray(startNumber = 1, endNumber = 6) {
  return Array.from({ length: endNumber }, (_, i) => startNumber + i);
}
