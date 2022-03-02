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

    this.view.winningNumberView.addHandler({
      name: 'winningNumberClick',
      handler: this.reset.bind(this),
    });

    this.view.winningNumberView.addHandler({
      name: 'winningNumberSubmit',
      handler: this.calculatePurchasedLottoResult.bind(this),
    });
  }

  calculatePurchasedLottoResult(winningNumberList) {
    const winNumbers = winningNumberList.slice(0, 6);
    const bonusNumber = winningNumberList[winningNumberList.length - 1];

    const lottoResult = { '1등': 0, '2등': 0, '3등': 0, '4등': 0, '5등': 0 };
    let count = 0;

    this.model.lottos.forEach(lotto => {
      count = 0;

      lotto.numbers.forEach(number => {
        if (winNumbers.includes(number)) {
          count++;
        }
      });

      if (count === 5 && lotto.numbers.includes(bonusNumber)) {
        lottoResult['2등']++;
        return;
      }

      switch (count) {
        case 3:
          lottoResult['5등']++;
          break;
        case 4:
          lottoResult['4등']++;
          break;
        case 5:
          lottoResult['3등']++;
          break;
        case 6:
          lottoResult['1등']++;
          break;
        default:
      }
    });

    this.view.winningNumberView.renderLottoResult(lottoResult);
  }

  onSubmitHandler(purchaseMoney) {
    const lottos = this.model.lottos;

    if (isEmpty(lottos)) {
      this.purchaseLotto(purchaseMoney);
      return;
    }

    if (this.tryRePurchase()) {
      this.view.purchasedLottoView.resetScreen();
      this.view.winningNumberView.resetScreen();

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
    this.view.purchaseMoneyView.resetInputValue();
    this.view.purchasedLottoView.resetScreen();
    this.view.winningNumberView.resetScreen();
  }
}
