import validatePurchaseMoney from '../validations/validate/validatePurchaseMoney.js';
import { DOM } from '../constants/constants.js';
import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';


const webInputHandler = {
  purchaseMoney() {
    try {
      DOM.purchaseErrorText.textContent = ""
      const purchaseMoney =  DOM.inputPrice.value;
      validatePurchaseMoney(Number(purchaseMoney));
      return purchaseMoney;
    } catch (e) {
      DOM.inputPrice.value = "";
      DOM.purchaseErrorText.textContent=e.message;
      return null
    }
  },

  winningNumbers(){
    try {
        DOM.winningErrorText.textContent="";
        const winningNumbers = Array.from(DOM.winningNumberInputs).map(input => Number(input.value));
        return new Lotto(winningNumbers.map((num) => Number(num)));
      } catch (e) {
        (DOM.winningNumberInputs).forEach(input => input.value = "");
        DOM.winningErrorText.textContent=e.message;
        return null
      }
  },

  bonusNumber(winningNumbersLotto){
    if(winningNumbersLotto===null){
      return null
    }
    
    try {
        DOM.bonusErrorText.textContent = ""
        const bonusNumber =  Number(DOM.bonusInput.value);
        return new WinningLotto(winningNumbersLotto, bonusNumber);
      } catch (e) {
        DOM.bonusInput.value = "";
        DOM.bonusErrorText.textContent=e.message;
        return null
      }
  }

};

export default webInputHandler;

