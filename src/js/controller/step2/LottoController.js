import LottoValidator from '../../model/LottoValidator';
import PurchaseMoneyInputView from '../../view/step2/PurchaseMoneyInputView';
import { convertToNum } from '../../utils/common';
import LottoMachine from '../../model/LottoMachine';
class LottoController {
  #lottoMachine;

  constructor() {
    this.view = {
      purchaseMoneyInputView: new PurchaseMoneyInputView(),
    };
    this.start();
  }

  start() {
    this.view.purchaseMoneyInputView.form.addEventListener('submit', e => {
      e.preventDefault();
      const money = this.view.purchaseMoneyInputView.input.value;
      try {
        LottoValidator.validateMoneyInput(convertToNum(money));
        this.#lottoMachine = new LottoMachine(money);
        this.view.purchaseMoneyInputView.reset();
      } catch (error) {
        this.view.purchaseMoneyInputView.reset();
        alert(error);
      }
    });
  }
}

export default LottoController;
