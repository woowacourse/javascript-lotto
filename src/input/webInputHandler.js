import validatePurchaseMoney from '../validations/validate/validatePurchaseMoney.js';
import { DOM } from '../constants/constants.js';


const webInputHandler = {
  purchaseMoney() {
    try {
      DOM.errorText.textContent = ""
      const purchaseMoney =  DOM.inputPrice.value;
      validatePurchaseMoney(Number(purchaseMoney));
      return purchaseMoney;
    } catch (e) {
      DOM.inputPrice.value = "";
      DOM.errorText.textContent=e.message
      return null
    }
  },
};

export default webInputHandler;

