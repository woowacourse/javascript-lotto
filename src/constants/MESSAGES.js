const SYSTEM_MESSAGE = Object.freeze({
  ENTER_PURCHASE_PRICE: '> 구입금액을 입력해 주세요. ',
  ENTER_WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  ENTER_BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요. ',
  ENTER_RESTART: '\n> 다시 시작하시겠습니까? (y/n) ',
});

const RESULT_MESSAGE = Object.freeze({
  WINNING: '\n당첨 통계',
  DIVIDER: '--------------------',
  MATCH_3: (count) => `3개 일치 (5,000원) - ${count}개`,
  MATCH_4: (count) => `4개 일치 (50,000원) - ${count}개`,
  MATCH_5: (count) => `5개 일치 (1,500,000원) - ${count}개`,
  MATCH_5_BONUS: (count) =>
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
  MATCH_6: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
  PROFITRATE: (profitRate) =>
    `총 수익률은 ${profitRate.toFixed(1).toLocaleString()}%입니다.`,
});

const ERROR_MESSAGE = Object.freeze({
  PURCHASE: {
    INVALID_UNIT: '구입 금액은 1,000원 단위로 입력해야 합니다.',
  },
  BONUS_NUMBER: {
    DUPLICATE: '보너스 번호는 당첨 번호와 중복될 수 없습니다.',
  },
  RESTART: {
    INVALID_INPUT: 'y 또는 n을 입력해주세요.',
  },
  LOTTO: {
    INVALID_TYPE: '로또 번호는 숫자여야 합니다.',
    INVALID_LENGTH: '로또 번호는 6개여야 합니다.',
    INVALID_RANGE: '로또 번호의 범위는 1~45 사이입니다.',
    DUPLICATE: '로또 번호는 중복되면 안됩니다.',
  },
  COMMON: {
    INVALID_TYPE: (key) => `${key}은(는) 숫자여야 합니다.`,
    INVALID_RANGE: ({ key, min, max }) =>
      `${key}은(는) ${min.toLocaleString()} 이상 ${max.toLocaleString()} 이하여야 합니다.`,
    INVALID_COUNT: (key) => `${key}은(는) 6개여야 합니다.`,
  },
});

export { SYSTEM_MESSAGE, RESULT_MESSAGE, ERROR_MESSAGE };
