const purchaseAmountSection = `
  <section class="lotto-game-section purchase-amount-section">
    <label for="purchase-amount-input">구입 금액을 입력해주세요.</label>
    <form class="purchase-amount-form">
      <input type="number" id="purchase-amount-input" placeholder="금액" min="1000" max="100000" step="1000"/>
      <button type="submit" class="button caption">구입</button>
    </form>
  </section>
`;

export default purchaseAmountSection;
