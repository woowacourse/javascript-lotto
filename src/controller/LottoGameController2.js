import { SETTING, RANKING } from '../constant/setting.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottosManager from '../domain/LottosManager.js';
import elementHandler from '../handler/elementHandler.js';
import Validator from '../validator/Validator.js';

const $purchaseAmount = elementHandler.$('.purchase-input-box');
const $purchaseForm = elementHandler.$('.purchase-form');

const $lottosText = elementHandler.$('.lottos-text');
class LottoGameController2 {
  #purchaseAmount;
  #lottos;

  async play() {
    this.inputPurchaseAmount();
  }

  inputPurchaseAmount() {
    $purchaseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log($purchaseAmount.value);
      this.checkPurchaseAmount($purchaseAmount.value);
    });
  }

  checkPurchaseAmount(purchaseAmount) {
    try {
      console.log(purchaseAmount);
      Validator.validatePurchaseAmount(purchaseAmount);
      this.#purchaseAmount = purchaseAmount;
      this.#createRandomLottos(this.#purchaseAmount / SETTING.LOTTO_PRICE);
    } catch (error) {
      alert(error.message);
      $purchaseAmount.value = '';
    }
  }

  #createRandomLottos(lottoCount) {
    console.log(lottoCount);
    $lottosText.innerHTML = `총 ${lottoCount}개를 구매하였습니다.`;
    const lottoList = new LottoMachine(lottoCount).getLottoNumberList();
    this.#lottos = new LottosManager(lottoList);
  }
}

export default LottoGameController2;
