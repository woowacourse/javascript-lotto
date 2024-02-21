const MESSAGE = Object.freeze({
  ERROR: Object.freeze({
    NUMBERS_RANGE_ERROR: '[ERROR]: 허용된 정수 범위를 벗어났습니다.',
    NUMBERS_LENGTH_ERROR: '[ERROR]: 6개의 정수를 입력하셔야 합니다.',
    NUMBERS_DUPLICATION_ERROR: '[ERROR]: 중복된 숫자가 있습니다.',
    PURCHASE_AMOUNT_ERROR: '[ERROR] 유효한 구입 금액이 아닙니다.',
  }),
  QUERY: Object.freeze({
    PURCHASE_AMOUNT: '> 구입금액을 입력해 주세요.',
    WIN_NUMBERS: '\n> 당첨번호를 입력해 주세요.',
    BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요.',
    RESTART: '\n> 다시 시작하시겠습니까? (y/n)',
  }),
});

export default MESSAGE;
