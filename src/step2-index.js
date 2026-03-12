/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import Validator from './step1/Validator.js';
import NodeRenderer from './step2/NodeRenderer.js';
import { clearState } from './step2/NodeUtils.js';
import { LottoMachine } from './step1/LottoMachine.js';

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
    } catch (err) {
      NodeRenderer.renderError(purchaseAmountContainer, err.message);
    }
  });
})();
