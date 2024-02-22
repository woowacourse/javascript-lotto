import LOTTO_RULE from '../constants/rules/lottoRule';

export const mentGenerator = (result, idx) => {
  const prize = LOTTO_RULE.PRIZE[idx].toLocaleString('ko-KR');
  const count = result[1];
  if (idx === 0) {
    return `6개 일치 (${prize}원) - ${count}개`;
  } else if (idx === 1) {
    return `5개 일치, 보너스 볼 일치 (${prize}원) - ${count}개`;
  } else {
    return `${6 - idx + 1}개 일치 (${prize}원) - ${count}개`;
  }
};
