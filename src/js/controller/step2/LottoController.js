import LottoValidator from '../../model/LottoValidator';
import PurchaseMoneyInputView from '../../view/step2/PurchaseMoneyInputView';
import { convertToNum } from '../../utils/common';
import LottoMachine from '../../model/LottoMachine';
import PurchaseLottoView from '../../view/step2/PurchaseLottoView';

class LottoController {
  #lottoMachine;

  constructor() {
    this.view = {
      purchaseMoneyInputView: new PurchaseMoneyInputView(),
      purchaseLottoView: new PurchaseLottoView(),
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
        this.showPurchaseLotto(this.#lottoMachine.lottos);
      } catch (error) {
        this.view.purchaseMoneyInputView.reset();
        alert(error);
      }
    });
  }

  showPurchaseLotto(lottos) {
    this.view.purchaseLottoView.rendering(lottos);
  }
}

export default LottoController;
