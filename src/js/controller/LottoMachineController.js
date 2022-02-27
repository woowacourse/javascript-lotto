import PurchasedLottos from '../model/PurchasedLottos.js';

import PurchaseMoneyView from '../view/purchaseMoneyView.js';
import PurchasedLottoView from '../view/PurchasedLottoView.js';
import WinningNumberView from '../view/WinningNumberView.js';

import { CONFIRM_MESSAGE, RULES } from '../constants/index.js';
import { isEmpty } from '../utils/common.js';

export default class LottoMachineController {
  constructor() {
    //멤버변수 초기화
    this.model = new PurchasedLottos();
    this.view = {
      purchaseMoneyView: new PurchaseMoneyView(),
      purchasedLottoView: new PurchasedLottoView(),
      winningNumberView: new WinningNumberView(),
    };

    //View handlers 멤버변수에 등록
    this.view.purchaseMoneyView.addHandler({
      name: 'purchasedMoneySubmit',
      handler: this.onSubmitHandler.bind(this),
    });
  }

  onSubmitHandler(purchaseMoney) {
    const lottos = this.model.lottos;

    if (isEmpty(lottos)) {
      this.purchaseLotto(purchaseMoney);
      return;
    }

    if (this.tryRePurchase()) {
      this.reset();
      this.purchaseLotto(purchaseMoney);
      return;
    }

    this.view.purchaseMoneyView.resetInputValue();
  }

  purchaseLotto(purchaseMoney) {
    const lottoCount = purchaseMoney / RULES.LOTTO_PRICE;
    const lottos = this.model.purchaseLotto(lottoCount);

    this.view.purchasedLottoView.render(lottos, lottoCount);
    this.view.winningNumberView.render();
  }

  tryRePurchase() {
    return confirm(CONFIRM_MESSAGE.RE_PURCHASE);
  }

  reset() {
    this.model.resetStatus();
    this.view.purchasedLottoView.resetScreen();
    this.view.winningNumberView.resetScreen();
  }
}
