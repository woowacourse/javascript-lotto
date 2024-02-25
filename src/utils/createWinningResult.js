import LOTTO_STATISTICS from '../constants/lotto-statistics';

export const createWinningResult = (key, count) => {
  const { number, price } = LOTTO_STATISTICS[key];

  if (key === 'fiveBonus') {
    return `${number}개 일치, 보너스 일치 (${price.toLocaleString()}원) - ${count}개`;
  }
  return `${number}개 일치 (${price.toLocaleString()}원) - ${count}개`;
};

export default createWinningResult;
