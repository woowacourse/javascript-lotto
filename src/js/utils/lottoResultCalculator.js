import { LOTTO_PRIZE_MONEY_UNIT, LOTTO_MATCHING_RESULT_KEY } from './constants.js';

const getKeyByMatchedNumCount = (matchedNumCount, lotto, lottoWinningBonusNumber) => {
  const KEY_BY_MATCHED_NUM_COUNT = {
    3: LOTTO_MATCHING_RESULT_KEY.THREE,
    4: LOTTO_MATCHING_RESULT_KEY.FOUR,
    5: lotto.includes(lottoWinningBonusNumber)
      ? LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS
      : LOTTO_MATCHING_RESULT_KEY.FIVE,
    6: LOTTO_MATCHING_RESULT_KEY.SIX,
    NOTHING: LOTTO_MATCHING_RESULT_KEY.NOTHING,
  };

  return KEY_BY_MATCHED_NUM_COUNT[matchedNumCount] ?? KEY_BY_MATCHED_NUM_COUNT.NOTHING;
};

const getPrizeUnit = (key) => {
  const PRIZE_MONEY_UNIT = {
    [LOTTO_MATCHING_RESULT_KEY.THREE]: LOTTO_PRIZE_MONEY_UNIT.THREE,
    [LOTTO_MATCHING_RESULT_KEY.FOUR]: LOTTO_PRIZE_MONEY_UNIT.FOUR,
    [LOTTO_MATCHING_RESULT_KEY.FIVE]: LOTTO_PRIZE_MONEY_UNIT.FIVE,
    [LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS]: LOTTO_PRIZE_MONEY_UNIT.FIVE_PLUS_BONUS,
    [LOTTO_MATCHING_RESULT_KEY.SIX]: LOTTO_PRIZE_MONEY_UNIT.SIX,
    [LOTTO_MATCHING_RESULT_KEY.NOTHING]: LOTTO_PRIZE_MONEY_UNIT.NOTHING,
  };

  return PRIZE_MONEY_UNIT[key] ?? PRIZE_MONEY_UNIT.NOTHING;
};

export const calcLottoMatchingResult = (
  lottoWinningNumbers,
  lottoWinningBonusNumber,
  lottoList
) => {
  const lottoMatchingResult = {
    [LOTTO_MATCHING_RESULT_KEY.THREE]: 0,
    [LOTTO_MATCHING_RESULT_KEY.FOUR]: 0,
    [LOTTO_MATCHING_RESULT_KEY.FIVE]: 0,
    [LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS]: 0,
    [LOTTO_MATCHING_RESULT_KEY.SIX]: 0,
    [LOTTO_MATCHING_RESULT_KEY.NOTHING]: 0,
  };

  lottoList.forEach((lotto) => {
    const matchedNumCount = lotto.filter((num) => {
      return lottoWinningNumbers.includes(num);
    }).length;

    const keyByMatchedNumCount = getKeyByMatchedNumCount(
      matchedNumCount,
      lotto,
      lottoWinningBonusNumber
    );

    lottoMatchingResult[keyByMatchedNumCount] += 1;
  });

  return lottoMatchingResult;
};

export const calcProfit = (purchaseMoney, lottoMatchingResult) => {
  const totalPrizeMoney = Object.keys(lottoMatchingResult).reduce((currentPrizeMoney, key) => {
    const prizeAmount = lottoMatchingResult[key];
    const earnedPrizeMoney = getPrizeUnit(key) * prizeAmount;

    return currentPrizeMoney + earnedPrizeMoney;
  }, 0);

  return Math.round(((totalPrizeMoney - purchaseMoney) / purchaseMoney) * 100);
};
