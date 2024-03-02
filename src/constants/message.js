const NEW_LINE = '\r\n';

const MESSAGE = {
  PURCHASE_AMOUNT_INPUT: '> 구입금액을 입력해 주세요.',
  LOTTO_COUNT: '개를 구매했습니다.',
  WINNING_NUMBERS_INPUT: `${NEW_LINE}> 당첨 번호를 입력해 주세요. `,
  BONUS_NUMBER_INPUT: `${NEW_LINE}> 보너스 번호를 입력해 주세요. `,
  LOTTO_RESULT: `${NEW_LINE}당첨 통계${NEW_LINE}--------------------`,
  RESTART: `${NEW_LINE}> 다시 시작하시겠습니까? (y/n)`,
};

const ERROR_MESSAGE = {
  BLANK_INPUT: '[ERROR] 공백이 아닌 값을 입력해주세요.',
  NOT_A_NUMBER_INPUT: '[ERROR] 숫자로 입력해주세요.',
  ZERO_INPUT: '[ERROR] 0은 입력할 수 없습니다. 1000원 단위로 입력해주세요.',
  OUT_OF_RANGE: '[ERROR] 1부터 45 사이의 값으로 입력해주세요.',
  PURCHASE_AMOUNT_UNIT: '[ERROR] 로또 구매 금액은 1000원 단위로 입력해주세요.',
  LOTTO_LENGTH: '[ERROR] 당첨 번호는 6개를 입력해주세요.',
  WINNING_NUMBERS_DUPLICATE: '[ERROR] 당첨 번호는 서로 중복될 수 없습니다.',
  BONUS_NUMBER_DUPLICATE: '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.',
  RESTART: '[ERROR] y 또는 n을 입력해주세요.',
};

const DOM_MESSAGE = {
  LOTTO_TITLE: '🎱 내 번호 당첨 확인 🎱',
  PURCHASE_AMOUNT_INPUT: '구입할 금액을 입력해주세요.',
  PURCHASE_BUTTON: '구입',
  LOTTO_NUMBERS_INPUT: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
  WINNING_NUMBERS: '당첨 번호',
  BONUS_NUMBER: '보너스 번호',
  LOTTO_RESULT_BUTTON: '결과 확인하기',
  CLOSE_MODAL_BUTTON: 'x',
  LOTTO_RESULT_TITLE: '🏆 당첨 통계 🏆',
  LOTTO_RESTART_BUTTON: '다시 시작하기',
};

export { MESSAGE, ERROR_MESSAGE, DOM_MESSAGE };
