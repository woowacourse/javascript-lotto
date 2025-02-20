export const MESSAGE = {
  READ_PRICE: '> 구입금액을 입력해 주세요. ',
  READ_WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  READ_BONUS_NUMBER: '> 보너스 번호를 입력해 주세요. ',
  READ_RESTART: '> 다시 시작하시겠습니까? (y/n) ',
  WINNING_RATE_TITLE: '당첨 통계',
  MATCH_THREE: (count) => `3개 일치 (5,000원) - ${count}개`,
  MATCH_FOUR: (count) => `4개 일치 (50,000원) - ${count}개`,
  MATCH_FIVE: (count) => `5개 일치 (1,500,000원) - ${count}개`,
  MATCH_FIVE_AND_BONUS: (count) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개 `,
  MATCH_SIX: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
  PRIZE_RATE_RESULT: (rate) => `총 수익률은 ${rate.toLocaleString()}%입니다.`,
};
