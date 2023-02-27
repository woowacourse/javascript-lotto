import { LOTTO_PRIZE_MONEY, PRIZE_MATCH_COUNT } from '../constants/condition';

const modalTemplate = (prize, count) => {
  const bonus = prize === 'secondPrize' ? ' + 보너스볼' : '';
  return `<tr>
    <td>${PRIZE_MATCH_COUNT[prize]}개${bonus}</td>
    <td>${LOTTO_PRIZE_MONEY[prize].toLocaleString('ko-KR')}원</td>
    <td>${count}개</td>
  </tr>`;
};

export default modalTemplate;
