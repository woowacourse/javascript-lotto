/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import Validator from './step1/Validator.js';
import NodeRenderer from './step2/NodeRenderer.js';
import { clearState, hideNode } from './step2/NodeUtils.js';
import { LottoMachine } from './step1/LottoMachine.js';
import { showNode } from './step2/NodeUtils.js';
import { WinningLotto } from './step1/Lotto.js';


const HIDE_CONTENT_SELECTORS = ['#purchase-lotto-content', '#winning-lotto-content'];

let lottoMachine = null;

(function() {
  const purchaseAmountForm = document.getElementById('purchase-amount-form');
  purchaseAmountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const purchaseAmountInput = document.getElementById('purchase-amount');
    const purchaseAmount = purchaseAmountInput.value;
    const purchaseAmountContainer = document.getElementById('purchase-amount-input-container');
    clearState(purchaseAmountContainer);
    try {
      Validator.validatePurchaseAmount(purchaseAmount);
      NodeRenderer.renderSuccess(purchaseAmountContainer);
      lottoMachine = new LottoMachine(purchaseAmount);
      const purchaseLottoContentContainer = document.getElementById('purchase-lotto-content');
      NodeRenderer.renderPurchaseLottoCount(purchaseLottoContentContainer, lottoMachine.getLottos().length);
      NodeRenderer.renderPurchaseLottoList(purchaseLottoContentContainer, lottoMachine.getLottos().map((lotto) => lotto.getLottoNumber()));
      showNode(HIDE_CONTENT_SELECTORS);
    } catch (err) {
      NodeRenderer.renderError(purchaseAmountContainer, err.message);
    }
  });
})();

(function() {
  const winningLottoForm = document.getElementById('winning-lotto-form');
  winningLottoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const winningLottoNumbersNode = document.getElementById('winning-lotto-numbers');
    const bonusNumber = document.getElementById('winning-lotto-bonus-number').value;
    const winningLottoNumber = [];
    [...winningLottoNumbersNode.elements].forEach((input) => {
      winningLottoNumber.push(input.value);
    });
    const winningLottoInputContainer = document.getElementById('winning-lotto-inputs-container');
    try {
      Validator.validateLottoNumber(winningLottoNumber);
      Validator.validateBonusNumber(winningLottoNumber, bonusNumber);
      const matchResultDialog = document.getElementById('lotto-match-result-dialog');
      matchResultDialog.showModal();
      const winningLotto = new WinningLotto(winningLottoNumber, bonusNumber);
      lottoMachine.calculateMatchResult(
        winningLotto.getWinningNumber(), winningLotto.getBonusNumber()
      );
      const matchResultSummary = lottoMachine.getMatchResultSummary();
      const matchResultContentNode = document.getElementById('lotto-match-result-content');
      NodeRenderer.renderCalculateResultTable(matchResultContentNode, matchResultSummary);
      NodeRenderer.renderRateOfReturn(matchResultContentNode, lottoMachine.getRateOfReturn());
      NodeRenderer.renderRestartButton(matchResultContentNode);
    } catch (err) {
      NodeRenderer.renderError(winningLottoInputContainer, err.message);
    }
  });
}());

(function() {
  const matchResultDialog = document.getElementById('lotto-match-result-dialog');
  const matchResultContentNode = document.getElementById('lotto-match-result-content');
  matchResultContentNode.addEventListener('click', (e) => {
    if (!e.target.matches('#restart-button')) return;
    matchResultDialog.close();
    lottoMachine = null;
    const purchaseAmountInput = document.getElementById('purchase-amount');
    purchaseAmountInput.value = '';
    const purchaseAmountContainer = document.getElementById('purchase-amount-input-container');
    clearState(purchaseAmountContainer);
    const purchaseLottoContent = document.getElementById('purchase-lotto-content');
    purchaseLottoContent.innerHTML = '';
    document.getElementById('winning-lotto-form').reset();
    hideNode(HIDE_CONTENT_SELECTORS);
    document.getElementById('lotto-match-result').remove();
    document.getElementById('lotto-rate-of-return').remove();
  });

  const dialogCloser = matchResultDialog.querySelector('button.dialog-closer');
  dialogCloser.addEventListener('click', () => {
    matchResultDialog.close();
  });
}());
