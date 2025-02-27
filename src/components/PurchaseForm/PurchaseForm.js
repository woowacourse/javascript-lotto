import PurchaseFormView from './PurchaseFormView.js';
import { PurchasePriceValidator } from '../../validators/PurchasePriceValidator.js';
import { PURCHASE_EVENT_NAME } from '../../constants/PurchaseFormConstants.js';

class PurchaseForm {
  constructor(container) {
    this.view = new PurchaseFormView(container);
    this.view.setOnPurchaseClick((purchasePrice) =>
      this.handlePurchase(purchasePrice),
    );
  }

  handlePurchase(purchasePrice) {
    try {
      PurchasePriceValidator.validate(purchasePrice);
      const event = new CustomEvent(PURCHASE_EVENT_NAME, {
        detail: purchasePrice,
        bubbles: true,
      });
      this.view.container.dispatchEvent(event);
      this.view.disableInput();
    } catch (e) {
      alert(e.message);
    }
  }
}

export default PurchaseForm;
