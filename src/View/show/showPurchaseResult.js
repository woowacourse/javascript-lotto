function showPurchaseResult(purchaseAmount) {
  const purchaseResult = document.createElement('div');
  purchaseResult.classList.add('purchase-result');
  purchaseResult.textContent = `총 ${purchaseAmount}개를 구매하였습니다.`;
  document.querySelector('.purchase-message').appendChild(purchaseResult);
}

export default showPurchaseResult;
