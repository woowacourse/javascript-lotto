import validatePurchaseMoney from '../validations/validate/validatePurchaseMoney.js';
import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';
import { DOM } from '../utils/DomSelector.js';
import { cleanInput } from '../view/utils/cleanInput.js';
import { cleanTextContent } from '../view/utils/cleanTextContent.js';
import { displayError } from '../view/utils/displayError.js';

const webInputHandler = {
  purchaseMoney() {
    try {
      cleanTextContent(DOM.purchaseErrorText)
      const purchaseMoney =  DOM.inputPrice.value;
      validatePurchaseMoney(Number(purchaseMoney));
      return purchaseMoney;
    } catch (e) {
      cleanInput(DOM.inputPrice);
      return displayError(DOM.purchaseErrorText, e.message)
    }
  },

  winningNumbers(){
    try {
        cleanTextContent(DOM.winningErrorText)
        const winningNumbers = Array.from(DOM.winningNumberInputs).map(input => Number(input.value));
        return new Lotto(winningNumbers.map((num) => Number(num)));
      } catch (e) {
        (DOM.winningNumberInputs).forEach(input => cleanInput(input));
        return displayError(DOM.winningErrorText, e.message)
      }
  },

  bonusNumber(winningNumbersLotto){
    if(winningNumbersLotto===null) return null
    try {
        cleanTextContent(DOM.bonusErrorText)
        const bonusNumber =  Number(DOM.bonusInput.value);
        return new WinningLotto(winningNumbersLotto, bonusNumber);
      } catch (e) {
        cleanInput(DOM.bonusInput);
        return displayError(DOM.bonusErrorText, e.message)
      }
  }

};

export default webInputHandler;

