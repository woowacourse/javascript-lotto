export const MESSAGES = {
  GET_MONEY_INPUT: '구입금액을 입력해 주세요. ',
  GET_WINNING_NUMBERS: '당첨 번호를 입력해 주세요. ',
  GET_BONUS_NUMBER: '보너스 번호를 입력해 주세요.',
  GET_RESTART_COMMAND: '다시 시작하시겠습니까? (y/n) ',
};

export const ERROR = {
  MONEY_NOT_A_INTEGER: '로또 구매 금액은 0 이상의 정수를 입력해야 한다.',
  INVALID_MONEY_UNIT: '1000원 단위로 금액을 주어야 합니다.',
  LOTTO_NOT_A_NUMBER: '로또 번호는 숫자로 이루어져 있어야 합니다.',
  INVALID_LOTTO_RANGE: '로또 번호는 1에서 45 사이의 숫자여야 합니다.',
  LOTTO_NOT_AN_ARRAY: '로또 번호들로는 배열이 들어와야 합니다.',
  INVALID_LOTTO_DIGITS: '로또 번호는 6자리여야 합니다.',
  LOTTO_NUMBERS_DUPLICATED: '로또 번호는 중복될 수 없습니다.',
  LOTTO_BONUS_DUPLICATED: '로또 번호와 보너스 번호는 중복될 수 없습니다.',
  INVALID_COMMAND: '재시작 명령어는 y또는 n으로 입력해야 합니다.',
};

export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const MONEY_UNIT = 1000;
export const LOTTO_NUMBERS_LENGTH = 6;
