import { SETTING, RANKING } from '../constant/setting.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottosManager from '../domain/LottosManager.js';
import elementHandler from '../handler/elementHandler.js';
import Validator from '../validator/Validator.js';
import View from '../view/View.js';

const $purchaseAmount = elementHandler.$('.purchase-input-box');
const $purchaseForm = elementHandler.$('.purchase-form');

class LottoGameController2 {
  #purchaseAmount;
  #lottosManager;

  play() {
    this.inputPurchaseAmount();
  }

  inputPurchaseAmount() {
    $purchaseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#checkPurchaseAmount($purchaseAmount.value);
    });
  }

  #checkPurchaseAmount(purchaseAmount) {
    try {
      Validator.validatePurchaseAmount(purchaseAmount);
      this.#purchaseAmount = purchaseAmount;
      this.#createRandomLottos();
    } catch (error) {
      alert(error.message);
      $purchaseAmount.value = '';
    }
  }

  #createRandomLottos() {
    const lottos = new LottoMachine(this.#purchaseAmount).getLottoNumberList();
    this.#lottosManager = new LottosManager(lottos);
    this.#showPurchasedLottos(lottos);
  }

  #showPurchasedLottos(lottos) {
    View.renderPurchasedLottos(lottos);
    View.renderWinningNumbersInput();
  }
}

export default LottoGameController2;
