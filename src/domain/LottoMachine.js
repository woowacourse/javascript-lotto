import pickRandomNumberInRange from '../util/pickRandomNumberInRange';
import { SETTING } from '../constant/setting';

class LottoMachine {
  #purchaseAmount;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }

  getLottoNumbersList() {
    const lottoCount = this.#purchaseAmount / SETTING.LOTTO_PRICE;
    return Array.from({ length: lottoCount }).map(() => this.#createLottoNumbers());
  }

  #createLottoNumbers() {
    const lotto = new Set();
    while (lotto.size < SETTING.LOTTO_LENGTH) {
      lotto.add(pickRandomNumberInRange(SETTING.MIN_LOTTO_NUMBER, SETTING.MAX_LOTTO_NUMBER));
    }
    return [...lotto].sort((firstNumber, secondNumber) => firstNumber - secondNumber);
  }
}

export default LottoMachine;
