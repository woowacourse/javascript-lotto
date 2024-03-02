import WebLottoController from '../../controllers/WebLottoController';
import Component from '../core/Component';
import dom from '../../utils/dom';
import { DOM_MESSAGE } from '../../constants/message';
import purchaseAmountValidator from '../../validators/purchaseAmountValidator';
import WinningNumberSection from '../winningNumberSection/WinningNumberSection';

class PurchaseLottoForm extends Component {
  template() {
    return `
        <form id="purchaseLottoForm">
          <input id="purchaseInput" name="purchaseInput" placeholder="금액" type="number" />
          <button id="purchaseButton" class="button buttonFont">${DOM_MESSAGE.PURCHASE_BUTTON}</button>
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
    const purchaseAmount = this.validatePurchaseAmount(purchaseAmountInput, dom.$('#purchaseError'));
    if (!purchaseAmount) return;
    dom.$('#winningNumberSection').classList.remove('hidden');
    const lottoController = new WebLottoController(purchaseAmount);
    lottoController.run();
    const $winningNumberSection = document.querySelector('#winningNumberSection');
    new WinningNumberSection($winningNumberSection, {
      lottoController,
    });
  }

  validatePurchaseAmount(purchaseAmount, $purchaseError) {
    try {
      purchaseAmountValidator.validate(purchaseAmount);
      $purchaseError.classList.add('hidden');
      return purchaseAmount;
    } catch (error) {
      // eslint-disable-next-line no-param-reassign
      $purchaseError.textContent = error.message;
      $purchaseError.classList.remove('hidden');
      return false;
    }
  }
}

export default PurchaseLottoForm;
