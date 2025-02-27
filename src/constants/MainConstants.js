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

const TEMPLATES = Object.freeze({
  DASHBOARD: `
    <div class="dashboard">
      <h1>🎱 내 번호 당첨 확인 🎱</h1>
      <div class="purchase-price-area"></div>
      <div class="lottos-area"></div>
      <div class="winning-inputs-area"></div>
    </div>
  `,
});

export { EVENT_TYPES, SELECTORS, TEMPLATES };
