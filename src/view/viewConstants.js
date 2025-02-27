export const INPUT = Object.freeze({
  PURCHASE_PRICE: '> 구입금액을 입력해 주세요.',
  WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요. ',
  REPLAY_GAME: '> 다시 시작하시겠습니까? (y/n) ',
});

export const OUTPUT = Object.freeze({
  VALUE: Object.freeze({
    STATISTICS_HEADER: '\n당첨 통계\n--------------------',
  }),

  FUNCTION: Object.freeze({
    PURCHASED_QUANTITY: (quantity) => `${quantity}개를 구매했습니다.`,
    MATCH: Object.freeze({
      TRHEE_MATCH: (count) => `3개 일치 (5,000원) - ${count}개`,
      FOUR_MATCH: (count) => `4개 일치 (50,000원) - ${count}개`,
      FIVE_MATCH: (count) => `5개 일치 (5,000원) - ${count}개`,
      FIVE_WITH_BONUS_MATCH: (count) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
      SIX_MATCH: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
    }),
    TOTAL_REVENUE: (revenue) => `총 수익률은 ${revenue}%입니다`,
  }),
});
