import { LOTTO, OUTPUT } from '../constants/messages.js';

export const printPurchasedQuantity = (quantity) => {
  console.log(OUTPUT.PURCHASED_QUANTITY(quantity));
};

export const printRandomLottos = (randomLottos) => {
  randomLottos.forEach((randomLotto) => {
    console.log(randomLotto);
  });
};

export const printStatistics = (matchCounts, revenue) => {
  console.log(OUTPUT.STATISTICS_HEADER);

  console.log(OUTPUT.MATCH.TRHEE_MATCH(matchCounts[LOTTO.THREE_MATCH]));
  console.log(OUTPUT.MATCH.FOUR_MATCH(matchCounts[LOTTO.FOUR_MATCH]));
  console.log(OUTPUT.MATCH.FIVE_MATCH(matchCounts[LOTTO.FIVE_MATCH]));
  console.log(OUTPUT.MATCH.FIVE_WITH_BONUS_MATCH(matchCounts[LOTTO.FIVE_WITH_BONUS_MATCH_IDX]));
  console.log(OUTPUT.MATCH.SIX_MATCH(matchCounts[LOTTO.FIVE_MATCH]));
  console.log(OUTPUT.TOTAL_REVENUE(revenue));
};
