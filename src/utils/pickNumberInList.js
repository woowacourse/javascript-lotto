const LENGTH = 6;

export default function pickNumberInList(min, max) {
  const randomNumbers = new Set();
  while (randomNumbers.size < LENGTH) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.add(randomNumber);
  }
  return [...randomNumbers];
}
