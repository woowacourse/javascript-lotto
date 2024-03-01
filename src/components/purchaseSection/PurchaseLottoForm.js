import WebLottoController from '../../controllers/WebLottoController';
import webInputView from '../../views/webInputView';
import Component from '../core/Component';

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
    const template = document.querySelector('#purchaseLottoTemplate');
    const newContent = document.importNode(template.content, true);
    const $purchaseSection = document.querySelector('#purchaseSection');
    $purchaseSection.appendChild(newContent);
  }

  setEvent() {
    const $purchaseLottoForm = document.querySelector('#purchaseLottoForm');
    $purchaseLottoForm.addEventListener('submit', e => {
      e.preventDefault();
      const purchaseAmountInput = $purchaseLottoForm.elements.purchaseInput.value;
      this.play(purchaseAmountInput);
    });
  }

  play(purchaseAmountInput) {
    const $purchaseError = document.getElementById('purchaseError');
    const purchaseAmount = webInputView.readPurchaseAmount(purchaseAmountInput, $purchaseError);
    if (!purchaseAmount) return;
    document.getElementById('winningNumberSection').classList.remove('hidden');
    document.querySelector('.winningNumberInput').focus();
    const lottoController = new WebLottoController(purchaseAmount);
    lottoController.run();
    document.getElementById('lottoResultButton').addEventListener('click', lottoController.handleLottoResult);
  }
}

export default PurchaseLottoForm;
