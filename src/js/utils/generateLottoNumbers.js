const MIN = 1;
const MAX = 45;
const LOTTO_NUMBERS_LENGTH = 6;

const getRandomNumber = () => Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

export const generateLottoNumbers = () => {
  const randomNumbers = new Set();
  while (randomNumbers.size < LOTTO_NUMBERS_LENGTH) {
    randomNumbers.add(getRandomNumber());
  }

  return [...randomNumbers];
};
