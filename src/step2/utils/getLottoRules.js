import LottoRules from "../../step1/domains/LottoRules.js";
import {
  LOTTO_RULES,
  LOTTO_REWARDS,
  exchangeRank,
} from "../../step1/constants/rules.js";

export const getLottoRules = () => {
  return new LottoRules({
    price: LOTTO_RULES.price,
    maxQuantity: LOTTO_RULES.maxQuantity,
    lottoLength: LOTTO_RULES.length,
    minNumber: LOTTO_RULES.minNumber,
    maxNumber: LOTTO_RULES.maxNumber,
    rewardInfo: LOTTO_REWARDS,
    exchangeRank: exchangeRank,
  });
};
