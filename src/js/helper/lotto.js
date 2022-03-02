import { LOTTO_RULE, PRIZE_BY_RANK, RANK_BY_MATCHING_NUMBERS } from '../constants.js';

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

export const makeLottoNumbers = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO_RULE.NUMBERS_COUNT) {
    lottoNumbers.add(generateRandomNumber(LOTTO_RULE.MIN_NUMBER, LOTTO_RULE.MAX_NUMBER));
  }
  return [...lottoNumbers];
};

export const extractWinningNumbers = ({ regularNumberElement, bonusNumberElement }) => {
  const regularNumbers = [];
  for (let element of regularNumberElement.values()) {
    if (element.value) {
      regularNumbers.push(Number(element.value));
    }
  }
  return [regularNumbers, Number(bonusNumberElement.value)];
};

const isBonusNumberIncluded = (lottoNumbers, bonusNumber) =>
  lottoNumbers.indexOf(bonusNumber) !== -1;

const getMatchedNumberCount = (lottoNumbers, winningNumbers) => {
  const duplicatedArray = [...lottoNumbers, ...winningNumbers];
  return duplicatedArray.length - new Set(duplicatedArray).size;
};

export const calculateLottoStatus = (lottos, regularNumbers, bonusNumber) => {
  const status = new Map([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    ['LOSE', 0],
  ]);

  lottos.forEach(lotto => {
    const matchedNumberCount = getMatchedNumberCount(lotto, regularNumbers);
    let rank = RANK_BY_MATCHING_NUMBERS[matchedNumberCount] || 'LOSE';
    if (matchedNumberCount === 5 && isBonusNumberIncluded(lotto, bonusNumber)) {
      rank = RANK_BY_MATCHING_NUMBERS.BONUSED_WINNER;
    }
    status.set(rank, status.get(rank) + 1);
  });
  return status;
};

export const calcuateUserProfitRate = (lottoStatus, buyedLottoCount) => {
  let profit = 0;
  for (let [rank, count] of lottoStatus.entries()) {
    profit += PRIZE_BY_RANK[rank] * count;
  }
  return profit / (buyedLottoCount * 1000) / 100;
};
