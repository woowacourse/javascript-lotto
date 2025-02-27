import { LOTTO } from '../domain/lottoConstants.js';
import { OUTPUT } from './viewConstants.js';

export const printPurchasedQuantity = (quantity) => {
  console.log(OUTPUT.FUNCTION.PURCHASED_QUANTITY(quantity));
};

export const printRandomLottos = (randomLottos) => {
  randomLottos.forEach((randomLotto) => {
    console.log(randomLotto);
  });
};

export const printStatistics = (matchCounts, revenue) => {
  console.log(OUTPUT.VALUE.STATISTICS_HEADER);
  console.log(OUTPUT.FUNCTION.MATCH.TRHEE_MATCH(matchCounts[LOTTO.THREE_MATCH]));
  console.log(OUTPUT.FUNCTION.MATCH.FOUR_MATCH(matchCounts[LOTTO.FOUR_MATCH]));
  console.log(OUTPUT.FUNCTION.MATCH.FIVE_MATCH(matchCounts[LOTTO.FIVE_MATCH]));
  console.log(OUTPUT.FUNCTION.MATCH.FIVE_WITH_BONUS_MATCH(matchCounts[LOTTO.FIVE_WITH_BONUS_MATCH_IDX]));
  console.log(OUTPUT.FUNCTION.MATCH.SIX_MATCH(matchCounts[LOTTO.FIVE_MATCH]));
  console.log(OUTPUT.FUNCTION.TOTAL_REVENUE(revenue));
};
