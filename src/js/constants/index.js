const CONFIRM_MESSAGE = Object.freeze({
  RE_PURCHASE:
    '다시 구입하시면 이미 구입했던 로또는 사라집니다. 다시 구입하시겠습니까?',
});

const ERROR_MESSAGE = Object.freeze({
  ZERO_MONEY: '구입할 금액을 입력해 주세요.',
  NOT_NUMBER_TYPE: '구입할 금액은 숫자여야 합니다.',
  NOT_UNIT_OF_THOUSAND: '구입할 금액의 단위는 1,000원 단위 입니다.',
});

const RULES = {
  LOTTO_PRICE: 1000,
  LOTTO_COUNT: 6,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
};

export { CONFIRM_MESSAGE, ERROR_MESSAGE, RULES };
