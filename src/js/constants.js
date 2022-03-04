export const LOTTO_RULE = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBERS_COUNT: 6,
};

export const ID_SELECTOR = {
  APP: 'app',
  PURCHASE_FORM: 'purchase-form',
  PURCHASE_INPUT: 'purchase-input',
  LOTTO_LIST_DESCRIPTION_QUANTITY: 'lotto-list-description-quantity',
  TOGGLE: 'toggle',
  TOGGLE_INPUT: 'toggle-input',
  LOTTO_LISTS: 'lotto-lists',
  LOTTO_LIST_SECTION: 'lotto-list-section',
  PICKED_NUMBERS_FORM: 'picked-numbers-form',
  RESULT_MODAL_BACKGROUND: 'result-modal-background',
  RESULT_MODAL_GRID_CONTAINER: 'result-modal-grid-container',
  RESULT_MODAL_CLOSE: 'result-modal-close',
  RESULT_MODAL_RESET: 'result-modal-reset',
  RESULT_MODAL_PROFIT_RATIO: 'result-modal-profit-ratio',
};

export const CLASS_SELECTOR = {
  LOTTO_LIST_SECTION_DISPLAY: 'lotto-list__section-display',
  LOTTO_LIST: 'lotto-list',
  LOTTO_LIST_TICKET: 'lotto-list__ticket',
  LOTTO_LIST_NUMBERS: 'lotto-list__numbers',
  PICKED_NUMBERS_FORM_DISPLAY: 'picked-numbers-form-display',
  PICKED_NUMBER_INPUT: 'picked-number__input',
  RESULT_MODAL_GRID_ITEM: 'result-modal-grid-item',
  UNFOLD: 'unfold',
  OPEN: 'open',
  SCROLL_BLOCK: 'scroll-block',
};

export const LOTTO_PRICE = 1000;

export const MAX_PURCHASABLE_CASH = 100000;

export const ALERT_MESSAGE = {
  NOT_DIVISIBLE: `${LOTTO_PRICE.toLocaleString()}으로 나누어떨어지는 금액을 입력해주세요.`,
  DUPLICATED_NUMBER: '당첨 번호가 서로 중복되지 않게 입력해주세요.',
  OVER_MAX_CASH: `최대 ${MAX_PURCHASABLE_CASH.toLocaleString()}원까지 구매 가능합니다.`,
};

export const WINNING_PRIZE = {
  '3개': 5000,
  '4개': 50000,
  '5개': 1500000,
  '5개+보너스볼': 30000000,
  '6개': 2000000000,
};
