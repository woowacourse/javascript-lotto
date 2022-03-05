export const SELECTOR = Object.freeze({
  BODY_TAG: 'body',
  APP_ID: '#app',

  CASH_INPUT_SECTION_CLASS: '.cash-input-section',
  CASH_INPUT_CLASS: '.cash-input',
  CASH_INPUT_BUTTON_CLASS: '.cash-input-button',

  PURCHASED_LOTTO_SECTION_CLASS: '.purchased-lotto-section',
  LOTTO_CONTAINER_CLASS: '.lotto-container',
  LOTTO_GRID_CLASS: '.lotto-grid',
  SHOW_NUMBER_TOGGLE_BUTTON_CLASS: '.show-number-toggle-button',

  WINNER_NUMBER_SECTION_CLASS: '.winner-number-section',
  WINNER_NUMBER_INPUT_CLASS: '.winner-number-input',
  BONUS_NUMBER_INPUT_CLASS: '.bonus-number-input',

  MODAL_CLASS: '.modal',
  PROFIT_SPAN_CLASS: '.profit',
  MATCH_TABLE_DATA_CLASS: '.match-result',
  RESULT_BUTTON_CLASS: '.result-button',
  MODAL_CLOSE_BUTTON_CLASS: '.close-button',
});

export const CASH_INPUT_RANGE = Object.freeze({
  MIN: 1000,
  MAX: 50000,
});

export const LOTTO_RULES = Object.freeze({
  PRICE: 1000,
  NUMBER_COUNT: 6,
  NUMBER_RANGE: { MIN: 1, MAX: 45 },
  PRIZE: Object.freeze({
    3: 5000,
    4: 50000,
    5: 1500000,
    '5+': 30000000,
    6: 2000000000,
  }),
});

export const ERROR_MESSAGE = Object.freeze({
  EMPTY_CASH_INPUT: '구입할 금액을 입력해주세요!',
  INVALID_UNIT_CASH_INPUT: `${LOTTO_RULES.PRICE}원 단위로 구입이 가능합니다.`,
  OUT_OF_RANGE_CASH_INPUT: `${CASH_INPUT_RANGE.MIN}원-${CASH_INPUT_RANGE.MAX}원 사이의 금액을 입력해주세요.`,
  EMPTY_WINNER_INPUT: `${LOTTO_RULES.NUMBER_COUNT}개의 당첨 번호와 보너스 번호를 입력해야 합니다.`,
  DUPLICATE_WINNER_INPUT: `${LOTTO_RULES.NUMBER_COUNT}개의 당첨 번호와 보너스 번호 중에 중복된 숫자가 있습니다.`,
  INVALID_NUMBER_WINNER_INPUT: `${LOTTO_RULES.NUMBER_COUNT}개의 당첨 번호와 보너스 번호는 모두 ${LOTTO_RULES.NUMBER_RANGE.MIN}-${LOTTO_RULES.NUMBER_RANGE.MAX} 사이의 자연수여야 합니다.`,
});
