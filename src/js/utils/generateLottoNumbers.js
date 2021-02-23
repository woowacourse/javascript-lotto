const MIN = 1;
const MAX = 45;

const getRandomNumber = () => Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

export const generateLottoNumbers = () => {
  const randomNumbers = [];
  while (randomNumbers.length < 6) {
    const randomNumber = getRandomNumber();
    if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};
