/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import Controller from './step2/Controller.js';

(function() {
  const purchaseAmountForm = document.getElementById('purchase-amount-form');
  purchaseAmountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const purchaseAmountInput = document.getElementById('purchase-amount');
    const purchaseAmount = purchaseAmountInput.value;
    Controller.submitPurchaseAmount(purchaseAmount);
  });
})();

(function() {
  const winningLottoForm = document.getElementById('winning-lotto-form');
  winningLottoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const winningLottoNumbersNode = document.getElementById('winning-lotto-numbers');
    const bonusNumber = document.getElementById('winning-lotto-bonus-number').value;
    const winningLottoNumber = [...winningLottoNumbersNode.elements].map((input) => input.value);
    Controller.submitWinningNumbers(winningLottoNumber, bonusNumber);
  });
}());

(function() {
  const matchResultContentNode = document.getElementById('lotto-match-result-content');
  matchResultContentNode.addEventListener('click', (e) => {
    if (!e.target.matches('#restart-button')) return;
    Controller.restart();
  });
}());
