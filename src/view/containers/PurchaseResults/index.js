/* eslint-disable no-undef */
const PurchaseResults = (store) => {
  return `
<div>
  <div id="purchase-results-title">총 ${store.lottos.length}개를 구매하였습니다.</div>
  <div>
    ${store.lottos.map((lotto) => `
    <div class="d-flex align-items-center">
      <div class="lotto-ticket-icon">🎟️</div>
      <div class="lotto-ticket ">${lotto.getNumbers().join(', ')}</div>
    </div>
    `).join('')}
  </div>
</div>
`;
};
export default PurchaseResults;
