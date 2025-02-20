export const INPUT = Object.freeze({
  PURCHASE_PRICE: '> 구입금액을 입력해 주세요.',
  WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요. ',
  REPLAY_GAME: '> 다시 시작하시겠습니까? (y/n) ',
});

export const OUTPUT = Object.freeze({
  PURCHASED_QUANTITY: (quantity) => `${quantity}개를 구매했습니다.`,
  STATISTICS_HEADER: '\n당첨 통계\n--------------------',
  TRHEE_MATCH: (count) => `3개 일치 (5,000원) - ${count}개`,
  FOUR_MATCH: (count) => `4개 일치 (50,000원) - ${count}개`,
  FIVE_MATCH: (count) => `5개 일치 (5,000원) - ${count}개`,
  FIVE_WITH_BONUS_MATCH: (count) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
  SIX_MATCH: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
  TOTAL_REVENUE: (revenue) => `총 수익률은 ${revenue}%입니다`,
});

export const LOTTO = Object.freeze({
  FIVE_WITH_BONUS_MATCH_IDX: 7,
  SIX_MATCH: 6,
  FIVE_WITH_BONUS_MATCH: 5.5,
  FIVE_MATCH: 5,
  FOUR_MATCH: 4,
  THREE_MATCH: 3,
  PRIZE_OF_SIX_MATCH: 2000000000,
  PRIZE_OF_FIVE_WITH_BONUS_MATCH: 30000000,
  PRIZE_OF_FIVE_MATCH: 1500000,
  PRIZE_OF_FOUR_MATCH: 50000,
  PRIZE_OF_THREE_MATCH: 5000,
});
