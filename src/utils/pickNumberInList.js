export default function pickNumberInList({ min, max, maxLength }) {
  const randomNumbers = new Set();
  while (randomNumbers.size < maxLength) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.add(randomNumber);
  }
  return [...randomNumbers];
}
