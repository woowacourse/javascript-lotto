import { LottoController } from '../../controller/webController/LottoController';
import { $ } from '../../util/dom';

class LottoView {
  #controller = new LottoController();

  constructor() {
    this.purchaseLotto = $('.purchaseLotto');
    this.moneyInput = $('.money-input', this.purchaseLotto);
    this.purchaseButton = $('.purchase-button', this.purchaseLotto);
  }

  purchaseHandler = (e) => {
    e.preventDefault();
    const money = this.moneyInput.value;
    this.#controller.purchaseLotto(money);
  };
}

export default LottoView;
