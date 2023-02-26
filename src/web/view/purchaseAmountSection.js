import { PURCHASE_AMOUNT } from '../../constants/setting';

const purchaseAmountSection = `
  <section class="lotto-game-section purchase-amount-section">
    <label for="purchase-amount-input">구입 금액을 입력해주세요.</label>
    <form id="purchase-amount-form">
      <input
        type="number"
        id="purchase-amount-input"
        placeholder="금액 (1,000원 단위의 금액을 입력하세요)"
        min="${PURCHASE_AMOUNT.MIN}"
        max="${PURCHASE_AMOUNT.MAX}"
        step="${PURCHASE_AMOUNT.STEP}"
      />
      <button type="submit" class="button caption" id="purchase-button">구입</button>
    </form>
  </section>
`;

export default purchaseAmountSection;
