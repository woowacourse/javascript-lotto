import randomNumberInRange from "../utils/randomNumberInRange.js";

const lottoGenerator = () => {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(String(randomNumberInRange(1, 45)));
  }

  return [...numbers].sort((current, next) => current - next);
};

export default lottoGenerator;
