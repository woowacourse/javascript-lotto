export const SELECTOR = Object.freeze({
  CASH_INPUT_SECTION_CLASS: '.cash-input-section',
  CASH_INPUT_CLASS: '.cash-input',
  CASH_INPUT_BUTTON_CLASSNAME: 'cash-input-button',
});

export const LOTTO_PRICE = 1000;
export const CASH_INPUT_RANGE = Object.freeze({
  MIN: 1000,
  MAX: 50000,
});

export const ERROR_MESSAGE = Object.freeze({
  EMPTY_INPUT_MESSAGE: '구입할 금액을 입력해주세요!',
  INVALID_UNIT_MESSAGE: `${LOTTO_PRICE}원 단위로 구입이 가능합니다.`,
  OUT_OF_RANGE_MESSAGE: `${CASH_INPUT_RANGE.MIN}원-${CASH_INPUT_RANGE.MAX}원 사이의 금액을 입력해주세요.`,
});
