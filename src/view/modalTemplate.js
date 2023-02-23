import { LOTTO_PRIZE_MONEY, PRIZE_MATCH_COUNT } from '../constants/condition';

const modalTemplate = (prize, count) => {
  if (prize === 'secondPrize') {
    return `<tr>
  <td>${PRIZE_MATCH_COUNT[prize]}개 + 보너스볼</td>
  <td>${LOTTO_PRIZE_MONEY[prize].toLocaleString()}원</td>
  <td>${count}개</td>
</tr>`;
  }
  return `<tr>
  <td>${PRIZE_MATCH_COUNT[prize]}개</td>
  <td>${LOTTO_PRIZE_MONEY[prize].toLocaleString()}원</td>
  <td>${count}개</td>
</tr>`;
};

export default modalTemplate;
