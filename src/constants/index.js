const GAME_VALUE = Object.freeze({
  LOTTO_PRICE: 1_000,
  LOTTO_SIZE: 6,
  MAX_LOTTO_NUMBER: 45,
  PRIZE: [2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000],
});

const FORMATTING_TYPE = Object.freeze({
  BOUGHT_LOTTOS: 0,
  WINNING_STATUS: 1,
  PROFIT_RATE: 2,
});

const MESSAGE = Object.freeze({
  ASK_BUDGET: '> 구입금액을 입력해 주세요.',
  ASK_WINNING_LOTTO: '\n> 당첨 번호를 입력해 주세요. ',
  ASK_BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요. ',
  ASK_RETRY: '\n> 다시 시작하시겠습니까? (y/n) ',

  ERROR_DECIMAL: '[ERROR] 구입 금액은 정수여야 합니다.',
  ERROR_INVALID_LOTTO_FORMAT:
    '[ERROR] 로또는 콤마(,)로 구분되는 6개의 1 이상 45 이하의 정수여야 합니다.',
  ERROR_LOTTO_DUPLICATES: '[ERROR] 로또 번호는 중복되는 수가 없어야 합니다',
  ERROR_INVALID_BONUS_NUMBER: '[ERROR] 보너스 번호는 1이상 45이하의 정수여야 합니다',
  ERROR_INVALID_RETRY_COMMAND: '[ERROR] 재시작 여부는 y 또는 n이어야 합니다.',
});

const REGEX = Object.freeze({
  DECIMAL: /^[1-9]+\d*$/,
  WINNING_LOTTO_FORMAT: /^(([1-9]|[1-3]\d|4[0-5]),){5}([1-9]|[1-3]\d|4[0-5])$/,
  BONUS_NUMBER: /^([1-9]|[1-3]\d|4[0-5])$/,
});

const RANK = Object.freeze({
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
});

const COMMAND = Object.freeze({
  RETRY: 'y',
  EXIT: 'n',
});

export { FORMATTING_TYPE, MESSAGE, REGEX, COMMAND, GAME_VALUE, RANK };
