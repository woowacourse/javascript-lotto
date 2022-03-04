export const SELECTOR = Object.freeze({
  APP: '#app',

  ERROR_MESSAGE: '.error-message',
  MODAL_CONTAINER: '.modal-container',
  MODAL_CLOSE: '.modal-close',

  NUMBER_TOGGLE: '#lotto-number-toggle',
  LOTTO_PURCHASE_BUTTON: '#lotto-purchase-button',
  LOTTO_MONEY_INPUT: '#lotto-money-input',
  LOTTO_BOUGHT_COUNT: '#lotto-bought-count',
  LOTTO_SHOW_RESULT_BUTTON: '#show-result-button',
  LOTTO_RESULT_LIST: '#lotto-result-list',
  LOTTO_YIELD_TEXT: '#lotto-yield-text',
  LOTTO_RETRY_BUTTON: '#lotto-retry-button',
  LOTTO_RESULT_MODAL: '#lotto-result-modal',

  LOTTO_NUMBER_TOGGLE: '.lotto-number-toggle',
  LOTTO_MONEY_SECTION: '.lotto-money-section',
  LOTTO_LIST_SECTION: '.lotto-list-section',
  LOTTO_WINNING_NUMBER_SECTION: '.winning-number-section',

  LOTTO_ITEM_CONTAINER: '.lotto-item-container',
  LOTTO_ITEM: '.item',
  LOTTO_ITEM_NUMBER: '.item-number',
  LOTTO_WINNING_NUMBER: '.winning-number-input',
});

const replaceSelectorToDomName = (origin) => {
  const output = { ID: {}, CLASS: {} };
  Object.entries(origin).forEach(([key, value]) => {
    const name = value.substr(1);

    if (value.substr(0, 1) === '#') output.ID[key] = name;
    else if (value.substr(0, 1) === '.') output.CLASS[key] = name;
  });

  return output;
};

export const DOM_NAME = Object.freeze(replaceSelectorToDomName(SELECTOR));
