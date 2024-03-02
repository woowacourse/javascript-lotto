import LOTTO_STATISTICS from '../constants/lotto-statistics.js';

const COMPARE_LOTTO_COUNT = 'fiveBonus';

export function createWinningResult(key, count) {
  const { number, price } = LOTTO_STATISTICS[key];
  const bonusText = key === COMPARE_LOTTO_COUNT ? ', 보너스 일치' : '';

  return `${number}개 일치${bonusText} (${price.toLocaleString()}원) - ${count}개`;
}

export function createWebWinningResult(key, count) {
  const { number, price } = LOTTO_STATISTICS[key];
  const bonusText = key === COMPARE_LOTTO_COUNT ? ' + 보너스볼' : '';

  return `<tr><td>${number}개${bonusText}</td><td>${price.toLocaleString()}원</td><td>${count}개</td></tr>`;
}
