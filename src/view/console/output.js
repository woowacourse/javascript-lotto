import { LOTTO_SYSTEM } from '../../constants/LottoSystem.js';

const OUTPUT = Object.freeze({
  PURCHASED_QUANTITY: (quantity) => `${quantity}개를 구매했습니다.`,
  STATISTICS_HEADER: '\n당첨 통계\n--------------------',
  TRHEE_MATCH: (count) => `3개 일치 (5,000원) - ${count}개`,
  FOUR_MATCH: (count) => `4개 일치 (50,000원) - ${count}개`,
  FIVE_MATCH: (count) => `5개 일치 (1,500,000원) - ${count}개`,
  FIVE_WITH_BONUS_MATCH: (count) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
  SIX_MATCH: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
  TOTAL_REVENUE: (revenue) => `총 수익률은 ${revenue}%입니다`,
});

export const printPurchasedQuantity = (quantity) => {
  console.log(OUTPUT.PURCHASED_QUANTITY(quantity));
};

export const printLottos = (lottos) => {
  lottos.forEach((lotto) => {
    console.log(lotto);
  });
};

export const printStatistics = (matchCounts, revenue) => {
  console.log(OUTPUT.STATISTICS_HEADER);

  console.log(OUTPUT.TRHEE_MATCH(matchCounts[LOTTO_SYSTEM.THREE_MATCH]));
  console.log(OUTPUT.FOUR_MATCH(matchCounts[LOTTO_SYSTEM.FOUR_MATCH]));
  console.log(OUTPUT.FIVE_MATCH(matchCounts[LOTTO_SYSTEM.FIVE_MATCH]));
  console.log(OUTPUT.FIVE_WITH_BONUS_MATCH(matchCounts[LOTTO_SYSTEM.FIVE_WITH_BONUS_MATCH_IDX]));
  console.log(OUTPUT.SIX_MATCH(matchCounts[LOTTO_SYSTEM.SIX_MATCH]));
  console.log(OUTPUT.TOTAL_REVENUE(revenue));
};
