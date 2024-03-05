import LottoPurchasePriceValidator from '../validators/LottoPurchasePriceValidator.js';

class LottoPurchaseForm {
  static validatePurchasePrice(purchasePrice) {
    try {
      LottoPurchasePriceValidator.validate(purchasePrice);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  }
}

export default LottoPurchaseForm;
