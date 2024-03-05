import {
  LOTTO_STATISTICS,
  COMPARE_LOTTO_COUNT,
} from '../constants/lotto-statistics.js';

export function createWinningResult(key, count) {
  const { number, price } = LOTTO_STATISTICS[key];
  const bonusText = key === COMPARE_LOTTO_COUNT ? ', 보너스 일치' : '';

  return `${number}개 일치${bonusText} (${price.toLocaleString()}원) - ${count}개`;
}
