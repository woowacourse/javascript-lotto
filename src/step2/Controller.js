import Validator from '../step1/Validator.js';
import View from './View.js';
import { LottoMachine } from '../step1/LottoMachine.js';

const HIDE_CONTENT_SELECTORS = [
  document.querySelector('#purchase-lotto-content'),
  document.querySelector('#winning-lotto-content'),
];


const Controller = {
  lottoMacine: null,

  submitPurchaseAmount(amount) {
    try {
      Validator.validatePurchaseAmount(amount);
      this.lottoMachine = new LottoMachine(amount);
      View.renderPurchaseLotto(this.lottoMachine.getLottos());
      View.convertHiddenState(HIDE_CONTENT_SELECTORS);
    } catch (err) {
      View.renderPurchaseAmountErrorMessage(err.message);
    }
  }
}

export default Controller;