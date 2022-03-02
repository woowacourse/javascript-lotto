import { LOTTO_RULE, RANK_BY_MATCHING_NUMBERS } from '../constants.js';

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

export const makeLottoNumbers = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO_RULE.NUMBERS_COUNT) {
    lottoNumbers.add(generateRandomNumber(LOTTO_RULE.MIN_NUMBER, LOTTO_RULE.MAX_NUMBER));
  }
  return lottoNumbers;
};

export const getWinningNumbers = ({ regularNumber, bonusNumber }) => {
  const regularNumbers = [];
  for (let element of regularNumber.values()) {
    if (element.value) {
      regularNumbers.push(Number(element.value));
    }
  }
  return [regularNumbers, Number(bonusNumber.value)];
};

const isBonusIncluded = (lottoNumbers, bonusNumber) => lottoNumbers.indexOf(bonusNumber) !== -1;

const getMatchedNumberCount = (lottoNumbers, winningNumbers) => {
  const mergedArray = [...lottoNumbers, ...winningNumbers];
  return mergedArray.length - new Set(mergedArray).size;
};

export const getWinningResult = (lottoList, { regularNumbers, bonusNumber }) => {
  const map = new Map([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    ['LOSE', 0],
  ]);
  lottoList.forEach(lotto => {
    lotto = [...lotto];
    const matchedNumberCount = getMatchedNumberCount(lotto, regularNumbers);
    let rank = RANK_BY_MATCHING_NUMBERS[matchedNumberCount] || 'LOSE';
    if (matchedNumberCount === 5 && isBonusIncluded(lotto, bonusNumber)) {
      rank = RANK_BY_MATCHING_NUMBERS.bonus;
    }
    map.set(rank, map.get(rank) + 1);
  });
  return map;
};
