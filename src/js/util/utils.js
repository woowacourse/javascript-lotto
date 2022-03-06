import { LOTTO, MONEY } from './constants';

export const isPositiveInteger = (payment) =>
  Number.isInteger(payment) && payment > 0;

export const isRemainder = (payment, price) => payment % price !== 0;

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

export const isOverRange = (minimum, maximum, number) =>
  number < minimum || number > maximum;

export const winningCount = (lotto, winningLotto) =>
  lotto.filter((number) => winningLotto.includes(number)).length;

export const isBounusNumber = (lotto, bounusNumber) =>
  lotto.includes(bounusNumber);

export const isOverlapped = (winningLotto) =>
  new Set(winningLotto).size !== winningLotto.length;

export const getTotalWinningCount = (lottoList, winningNumber, bonusNumber) => {
  const result = [0, 0, 0, 0, 0];
  lottoList.forEach((lotto) => {
    const count = winningCount(lotto, winningNumber);
    const bonusCount = isBounusNumber(lotto, bonusNumber);
    if (count === 6) {
      result[4] += 1;
    }
    if (count === 5 && bonusCount === 1) {
      result[3] += 1;
    }
    if (count + bonusCount > 2 && count + bonusCount < 6) {
      result[count + bonusCount - 3] += 1;
    }
  });

  return result;
};

export const totalWinningMoney = (result) =>
  result.reduce((sum, count, index) => sum + count * MONEY.PRIZE[index], 0);

export const winningRate = (totalMoney, lottoCount) =>
  Math.floor(
    ((totalMoney - lottoCount * MONEY.STANDARD) /
      (lottoCount * MONEY.STANDARD)) *
      100
  );
