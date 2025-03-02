const EVENT_TYPES = Object.freeze({
  PURCHASE_LOTTOS: 'purchaseLottos',
  CALCULATE_RESULT: 'calculateResult',
  RESTART: 'restart',
});

const MAIN_SELECTORS = Object.freeze({
  MAIN: '#main',
  PURCHASE_PRICE_AREA: '.purchase-price-area',
  LOTTOS_AREA: '.lottos-area',
  WINNING_INPUTS_AREA: '.winning-inputs-area',
});

export { EVENT_TYPES, MAIN_SELECTORS };
