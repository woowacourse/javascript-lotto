import { LOTTO_PRIZE_INFO, LOTTO_INFO } from '../constants/constant.js';

export function getLottoPrize(correctCount) {
  let prizeMoney = 0;
  switch (correctCount) {
    case LOTTO_PRIZE_INFO.MATCH_NUMBER_3:
      prizeMoney = LOTTO_PRIZE_INFO.MATCH_NUMBER_3_PRIZE;
      break;
    case LOTTO_PRIZE_INFO.MATCH_NUMBER_4:
      prizeMoney = LOTTO_PRIZE_INFO.MATCH_NUMBER_4_PRIZE;
      break;
    case LOTTO_PRIZE_INFO.MATCH_NUMBER_5:
      prizeMoney = LOTTO_PRIZE_INFO.MATCH_NUMBER_5_PRIZE;
      break;
    case LOTTO_PRIZE_INFO.MATCH_NUMBER_6:
      prizeMoney = LOTTO_PRIZE_INFO.MATCH_NUMBER_6_PRIZE;
      break;
  }
  return prizeMoney;
}

export function computeLottoRateOfReturn(
  currentLottoNumbers,
  lastLottoNumberList,
) {
  let lastLottoNumbers = lastLottoNumberList[0];
  const bounsNumber = lastLottoNumberList[1];
  let totalPrizeMoney = 0;
  currentLottoNumbers.forEach(lotto => {
    const corretCount = lotto.numbers.filter(num => {
      if (lastLottoNumbers.includes(num)) return num;
    }).length;
    if (
      corretCount === LOTTO_PRIZE_INFO.MATCH_NUMBER_5 &&
      lotto.numbers.includes(bounsNumber)
    ) {
      totalPrizeMoney =
        totalPrizeMoney + LOTTO_PRIZE_INFO.MATCH_NUMBER_BONUS_PRIZE;
      return;
    }
    totalPrizeMoney = totalPrizeMoney + getLottoPrize(corretCount);
  });
  return (
    (totalPrizeMoney / (currentLottoNumbers.length * LOTTO_INFO.LOTTO_PRICE)) *
    LOTTO_PRIZE_INFO.PERCENT_RATE
  );
}

export function computeLottoRankList(currentLottoNumbers, lastLottoNumberList) {
  let lastLottoNumbers = lastLottoNumberList[0];
  const bonusNumber = lastLottoNumberList[1];
  let lottoRankObj = {
    rank_5: 0,
    rank_4: 0,
    rank_3: 0,
    rank_2: 0,
    rank_1: 0,
  };
  currentLottoNumbers.forEach(lotto => {
    const correctCount = lotto.numbers.filter(num => {
      if (lastLottoNumbers.includes(num)) return num;
    }).length;
    if (
      correctCount === LOTTO_PRIZE_INFO.MATCH_NUMBER_5 &&
      lotto.numbers.includes(bonusNumber)
    ) {
      lottoRankObj.rank_2++;
      return;
    }
    switch (correctCount) {
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_3:
        lottoRankObj.rank_5++;
        break;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_4:
        lottoRankObj.rank_4++;
        break;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_5:
        lottoRankObj.rank_3++;
        break;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_6:
        lottoRankObj.rank_1++;
        break;
    }
  });
  const lottoRankList = Object.values(lottoRankObj);
  return lottoRankList;
}
