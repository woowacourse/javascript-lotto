import { LOTTO, MONEY_STANDARD, RANK, RANK_PRIZE } from './constants';

export const isPositiveInteger = (payment) => Number.isInteger(payment) && payment > 0;

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

export const isOverRange = (minimum, maximum, number) => number < minimum || number > maximum;

export const winningCount = (lotto, winningLotto) => lotto.filter((number) => winningLotto.includes(number)).length;

export const isBounusNumber = (lotto, bounusNumber) => lotto.includes(bounusNumber);

export const isOverlapped = (winningLotto) => new Set(winningLotto).size !== winningLotto.length;

const getRank = (count, bonusCount) => {
  const sum = count + bonusCount;
  if (count === 6) return RANK.FIRST;
  if (sum === 6) return RANK.SECOND;
  if (sum === 5) return RANK.THIRD;
  if (sum === 4) return RANK.FOURTH;
  if (sum === 3) return RANK.FIFTH;
};

export const getWinningCountResult = (lottoList, winningNumber, bonusNumber) => {
  const totalWinningCount = {
    fifth: 0,
    fourth: 0,
    third: 0,
    second: 0,
    first: 0,
  };

  lottoList.forEach((lotto) => {
    const count = winningCount(lotto, winningNumber);
    const bonusCount = isBounusNumber(lotto, bonusNumber);
    if (count + bonusCount > 2) {
      totalWinningCount[getRank(count, bonusCount)] += 1;
    }
  });

  return totalWinningCount;
};

export const getTotalWinningMoney = (rankCount) =>
  Object.entries(rankCount).reduce((sum, [key, value]) => sum + value * RANK_PRIZE[key], 0);

export const getWinningRate = (totalMoney, lottoCount) =>
  Math.floor(((totalMoney - lottoCount * MONEY_STANDARD) / (lottoCount * MONEY_STANDARD)) * 100);
