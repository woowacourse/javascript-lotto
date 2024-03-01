import WebLottoController from '../../controllers/WebLottoController';
import webInputView from '../../views/webInputView';
import Component from '../core/Component';
import dom from '../../utils/dom';

class PurchaseLottoForm extends Component {
  template() {
    return `
        <form id="purchaseLottoForm">
          <input id="purchaseInput" name="purchaseInput" placeholder="금액" />
          <button id="purchaseButton" class="button buttonFont">구입</button>
        </form>
        <div id="purchaseError" class="hidden"></div>
        `;
  }

  mounted() {
    const template = dom.$('#purchaseLottoTemplate');
    const newContent = document.importNode(template.content, true);
    const $purchaseSection = dom.$('#purchaseSection');
    $purchaseSection.appendChild(newContent);
  }

  setEvent() {
    const $purchaseLottoForm = dom.$('#purchaseLottoForm');
    $purchaseLottoForm.addEventListener('submit', e => {
      e.preventDefault();
      const purchaseAmountInput = $purchaseLottoForm.elements.purchaseInput.value;
      this.play(purchaseAmountInput);
    });
  }

  play(purchaseAmountInput) {
    const purchaseAmount = webInputView.readPurchaseAmount(purchaseAmountInput, dom.$('#purchaseError'));
    if (!purchaseAmount) return;
    dom.$('#winningNumberSection').classList.remove('hidden');
    dom.$('.winningNumberInput').focus();
    const lottoController = new WebLottoController(purchaseAmount);
    lottoController.run();
    dom.$('#lottoResultButton').addEventListener('click', lottoController.handleLottoResult);
  }
}

export default PurchaseLottoForm;
