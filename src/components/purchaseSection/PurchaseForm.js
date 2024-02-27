import WebLottoController from '../../controllers/WebLottoController';
import webInputView from '../../views/webInputView';
import Component from '../Component';

const app = {
  play() {
    const purchaseAmount = webInputView.readPurchaseAmount();
    if (!purchaseAmount) return;
    document.querySelector('.winningNumberInput').focus();
    const lottoController = new WebLottoController(purchaseAmount);
    lottoController.run();
  },
};

class PurchaseForm extends Component {
  render() {
    this.innerHTML = `
        <form id="purchaseForm">
            <input id="purchaseInput" placeholder="금액" />
            <button id="purchaseButton" class="button buttonFont">구입</button>
        </form>
        `;
  }

  setEventHandler() {
    const $purchaseForm = document.getElementById('purchaseForm');
    const $purchaseBtn = document.getElementById('purchaseButton');
    $purchaseBtn.addEventListener('click', this.handlePurchaseBtn);
    $purchaseForm.addEventListener('submit', this.handleFormSubmit);
  }

  handlePurchaseBtn() {
    app.play();
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }
}

customElements.define('purchase-form', PurchaseForm);
