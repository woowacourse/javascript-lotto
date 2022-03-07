export const CONFIRM_MESSAGE = {
  RE_PURCHASE:
    '로또를 다시 구입하면 이미 구입한 로또는 사라집니다.\n다시 구입하시겠습니까?',
};

export const ERROR_MESSAGE = {
  //구입할 금액 관련
  ZERO_PURCHASE_MONEY: '구입할 금액을 입력해 주세요.',
  INVALID_PURCHASE_MONEY_TYPE: '구입할 금액은 숫자여야 합니다.',
  NEGATIVE_PURCHASE_MONEY: '구입할 금액으로 음수를 입력할 수 없습니다.',
  NOT_PURCHASE_MONEY_UNIT_OF_THOUSAND:
    '구입할 금액의 단위는 1,000원 단위 입니다.',
  //당첨 번호 관련
  EMPTY_WINNING_NUMBER: '당첨 번호를 모두 입력해주세요.',
  INVALID_WINNING_NUMBER_TYPE: '당첨 번호를 숫자 타입으로 입력해주세요',
  OUT_WINNING_NUMBER_RANGE:
    '당첨 번호는 로또번호 범위이내로 입력해주세요.(로또번호 1 ~ 45)',
  DUPLICATE_WINNING_NUMBER: '당첨 번호를 중복 없이 입력해주세요.',
};

export const RULES = {
  LOTTO_PRICE: 1000,
  LOTTO_NUMS: 6,
  WINNING_LOTTO_NUMS: 7,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
};

export const LOTTO_RANKING_REWARD = {
  '1등': 2000000000,
  '2등': 30000000,
  '3등': 1500000,
  '4등': 50000,
  '5등': 5000,
};

export const RANKING_ACCORDING_MATCH_COUNT = {
  6: '1등',
  '5+bonus': '2등',
  5: '3등',
  4: '4등',
  3: '5등',
};

export const EVENT = {
  SUBMIT_MONEY: '@submit-money',
  CLICK_RESTART: '@click-restart',
  SUBMIT_WINNING_NUMBERS: '@submit-winning-numbers',
};
