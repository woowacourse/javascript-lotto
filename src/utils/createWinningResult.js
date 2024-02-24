import LOTTO_STATICS from '../constants/lotto-statics';

export const createWinningResult = (key, count) => {
  const { number, price } = LOTTO_STATICS[key];

  if (key === 'fiveBonus') {
    return `${number}개 일치, 보너스 일치 (${price.toLocaleString()}원) - ${count}개`;
  }
  return `${number}개 일치 (${price.toLocaleString()}원) - ${count}개`;
};

export default createWinningResult;
