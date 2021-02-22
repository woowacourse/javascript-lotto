export const getRandomNumber = ({ min, max }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRateOfReturn = (profit, loss) => ((profit - loss) / loss) * 100;
