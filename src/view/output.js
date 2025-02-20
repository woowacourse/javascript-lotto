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

  console.log(OUTPUT.TRHEE_MATCH(matchCounts[LOTTO.THREE_MATCH]));
  console.log(OUTPUT.FOUR_MATCH(matchCounts[LOTTO.FOUR_MATCH]));
  console.log(OUTPUT.FIVE_MATCH(matchCounts[LOTTO.FIVE_MATCH]));
  console.log(OUTPUT.FIVE_WITH_BONUS_MATCH(matchCounts[LOTTO.FIVE_WITH_BONUS_MATCH_IDX]));
  console.log(OUTPUT.SIX_MATCH(matchCounts[LOTTO.FIVE_MATCH]));
  console.log(OUTPUT.TOTAL_REVENUE(revenue));
};
