/* eslint-disable no-undef */
const PurchaseResults = () => {
  return `
<div>
  <div>총 ${store.lottos.length}개를 구매하였습니다.</div>
  <div>
    ${store.lottos.map((lotto) => `<div>🎟️${lotto.getNumbers().join(', ')}</div>`).join('')}
  </div>
</div>
`;
};
export default PurchaseResults;
