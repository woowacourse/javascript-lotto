import SELECTORS from '../../constants/Selectors.js';

function showPurchaseResult(purchaseAmount) {
  const purchaseResult = document.createElement('div');
  purchaseResult.id = SELECTORS.RESULT.PURCHASE;
  purchaseResult.textContent = `총 ${purchaseAmount}개를 구매하였습니다.`;
  document
    .getElementById(SELECTORS.CONTAINER.MESSAGE)
    .appendChild(purchaseResult);
}

export default showPurchaseResult;
