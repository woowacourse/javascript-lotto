export function pickUniqueNumbersInRange(min, max, size) {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < size) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNum);
  }
  return Array.from(uniqueNumbers);
}

export function makeLottos(amount) {
  return Array.from({ length: amount }, () => {
    const numbers = pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
    return numbers;
  });
}
