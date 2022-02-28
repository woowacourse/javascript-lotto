import { LOTTO } from './constants';

export const isPositiveInteger = (payment) =>
  Number.isInteger(payment) && payment > 0;

export const divideBy = (payment, price) => payment % price === 0;

export const createRandomNumber = (minNumber, maxNumber) => {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

export const createRandomNumberList = () => {
  const randomNumberList = [];

  while (randomNumberList.length < LOTTO.LENGTH) {
    const random = createRandomNumber(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER);
    if (!randomNumberList.includes(random)) {
      randomNumberList.push(random);
    }
  }

  return randomNumberList;
};

export const isInRange = (minimum, maximum, number) =>
  number >= minimum && number <= maximum;

export const winningCount = (lotto, winningLotto) =>
  lotto.filter((number) => winningLotto.includes(number)).length;

export const isBounusNumber = (lotto, bounusNumber) =>
  lotto.includes(bounusNumber);

export const isOverlapped = (winningLotto, bonusNumber) =>
  new Set(winningLotto).size !== winningLotto.length ||
  winningLotto.includes(bonusNumber);
