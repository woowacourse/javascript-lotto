export default function pickNumberInList(LOTTO_RULE) {
  const randomNumbers = new Set();
  while (randomNumbers.size < LOTTO_RULE.LENGTH) {
    const randomNumber =
      Math.floor(
        Math.random() * (LOTTO_RULE.MAX_RANGE - LOTTO_RULE.MIN_RANGE + 1),
      ) + LOTTO_RULE.MIN_RANGE;
    randomNumbers.add(randomNumber);
  }
  return [...randomNumbers];
}
