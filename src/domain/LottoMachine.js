import pickRandomNumberInRange from '../util/pickRandomNumberInRange.js';
import { SETTING } from '../constant/setting.js';

class LottoMachine {
  #purchaseAmount;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }
  getLottoNumberList() {
    const lottoCount = this.#purchaseAmount / SETTING.LOTTO_PRICE;
    return Array.from({ length: lottoCount }).map((_) => this.#createLottoNumber());
  }

  #createLottoNumber() {
    const lotto = new Set();
    while (lotto.size < SETTING.LOTTO_LENGTH) {
      lotto.add(pickRandomNumberInRange(SETTING.MIN_LOTTO_NUMBER, SETTING.MAX_LOTTO_NUMBER));
    }
    return [...lotto].sort((firstNumber, secondNumber) => firstNumber - secondNumber);
  }
}

export default LottoMachine;
