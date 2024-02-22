const MESSAGE = Object.freeze({
  ERROR: Object.freeze({
    PREFIX: '[ERROR]',
    NUMBERS_RANGE: '허용된 정수 범위를 벗어났습니다.',
    NUMBERS_LENGTH: '6개의 정수를 입력하셔야 합니다.',
    NUMBERS_DUPLICATION: '중복된 숫자가 있습니다.',
    PURCHASE_AMOUNT: '유효한 구입 금액이 아닙니다.',
    RESTART_RESPONSE: '유효한 응답이 아닙니다. y/n으로 응답해 주세요.',
  }),
  QUERY: Object.freeze({
    PURCHASE_AMOUNT: '> 구입금액을 입력해 주세요.',
    WIN_NUMBERS: '\n> 당첨번호를 입력해 주세요.',
    BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요.',
    RESTART: '\n> 다시 시작하시겠습니까? (y/n)',
  }),

  RESPONSE: Object.freeze({
    RESTART: Object.freeze({
      YES: 'y',
      NO: 'n',
    }),
  }),

  OUTPUT: Object.freeze({
    LOTTO_PURCHASED: `개를 구매했습니다.`,
    WINNING_STATISTICS_TITLE: `\n당첨 통계\n--------------------`,
    MATCH_COUNT: `개 일치`,
    BONUS_MATCH: `, 보너스 볼 일치`,
    WIN_COUNT: `개`,
    EMPTY: ``,
    HYPEN: '-',
    RATE_OF_REVENUE: (result) => `총 수익률은 ${result}%입니다.`,
    WIN_PRICE: (price) => `(${price})원)`,
  }),
});

export default MESSAGE;
