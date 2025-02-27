const PURCHASE_FORM_TEMPLATE = `
  <label>구입할 금액을 입력해주세요.</label>
  <div class="purchase-price-input">
    <input type="text" placeholder="금액" />
    <button class="purchase-button" disabled>구입</button>
  </div>
`;

const PURCHASE_EVENT_NAME = 'purchaseLottos';

const SELECTORS = Object.freeze({
  INPUT: '.purchase-price-input input',
  BUTTON: '.purchase-price-input button',
});

export { PURCHASE_FORM_TEMPLATE, PURCHASE_EVENT_NAME, SELECTORS };
