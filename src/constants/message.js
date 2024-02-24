import NUMBER from "./number";

const ERROR_MESSAGE = Object.freeze({
  PREFIX: '[ERROR]',
  NUMBERS_RANGE: '허용된 정수 범위를 벗어났습니다.',
  NUMBERS_LENGTH: `${NUMBER.LOTTO_LENGTH}개의 정수를 입력하셔야 합니다.`,
  NUMBERS_DUPLICATION: '중복된 숫자가 있습니다.',
  PURCHASE_AMOUNT: '유효한 구입 금액이 아닙니다.',
  RESTART_RESPONSE: '유효한 응답이 아닙니다. y/n으로 응답해 주세요.',
});
const QUERY_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: '> 구입금액을 입력해 주세요.',
  WIN_NUMBERS: '\n> 당첨번호를 입력해 주세요.(,로 숫자를 구분하여 입력해주세요)',
  BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요.',
  RESTART: '\n> 다시 시작하시겠습니까? (y/n)\n',
});

const RESPONSE_MESSAGE = Object.freeze({
  RESTART: Object.freeze({
    YES: 'y',
    NO: 'n',
  }),
});

const OUTPUT_MESSAGE = Object.freeze({
  LOTTO_PURCHASED: `개를 구매했습니다.`,
  WINNING_STATISTICS_TITLE: `\n당첨 통계\n--------------------`,
});

export { ERROR_MESSAGE, QUERY_MESSAGE, RESPONSE_MESSAGE, OUTPUT_MESSAGE };
