const EVENT_TYPES = Object.freeze({
  PURCHASE_LOTTOS: 'purchaseLottos',
  CALCULATE_RESULT: 'calculateResult',
  RESTART: 'restart',
});

const SELECTORS = Object.freeze({
  PURCHASE_PRICE_AREA: '.purchase-price-area',
  LOTTOS_AREA: '.lottos-area',
  WINNING_INPUTS_AREA: '.winning-inputs-area',
});

export { EVENT_TYPES, SELECTORS };
