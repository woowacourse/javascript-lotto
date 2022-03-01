import {
  LOTTO_PRICE,
  MATCH_NUMBER_3,
  MATCH_NUMBER_3_PRIZE,
  MATCH_NUMBER_4_PRIZE,
  MATCH_NUMBER_5,
  MATCH_NUMBER_5_PRIZE,
  MATCH_NUMBER_6,
  MATCH_NUMBER_6_PRIZE,
  MATCH_NUMBER_BONUS_PRIZE,
  PERCENT_RATE,
} from '../constants/constant.js';

export function getLottoPrize(correctCount) {
  let prizeMoney = 0;
  switch (correctCount) {
    case MATCH_NUMBER_3:
      prizeMoney = MATCH_NUMBER_3_PRIZE;
      break;
    case MATCH_NUMBER_4_PRIZE:
      prizeMoney = MATCH_NUMBER_4_PRIZE;
      break;
    case MATCH_NUMBER_5:
      prizeMoney = MATCH_NUMBER_5_PRIZE;
      break;
    case MATCH_NUMBER_6:
      prizeMoney = MATCH_NUMBER_6_PRIZE;
      break;
  }
  return prizeMoney;
}

export function computeLottoRateOfReturn(
  currentLottoNumbers,
  lastLottoNumberList,
) {
  let lastLottoNumbers = lastLottoNumberList;
  const bounsNumber = lastLottoNumbers.pop();
  let totalPrizeMoney = 0;
  currentLottoNumbers.forEach(lotto => {
    const corretCount = lotto.numbers.filter(num => {
      if (lastLottoNumberList.includes(num)) return num;
    }).length;
    if (corretCount === MATCH_NUMBER_5 && lotto.numbers.includes(bounsNumber)) {
      totalPrizeMoney = totalPrizeMoney + MATCH_NUMBER_BONUS_PRIZE;
      return;
    }
    totalPrizeMoney = totalPrizeMoney + getLottoPrize(corretCount);
  });
  return (
    (totalPrizeMoney / (currentLottoNumbers.length * LOTTO_PRICE)) *
    PERCENT_RATE
  );
}
