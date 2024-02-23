import Lotto from '../entities/Lotto';
import CONFIG from '../../constants/config';

class LotteryMachine {
  #amount;

  constructor(purchaseAmount) {
    this.#amount = parseInt(purchaseAmount, 10) / CONFIG.PURCHASE_UNIT;
  }

  makeLottery() {
    return Array.from({ length: this.#amount }).map(() => this.makeLotto());
  }

  makeLotto() {
    const lotto = this.#pickUniqueLottoNumbers();
    return new Lotto(lotto);
  }

  #pickUniqueLottoNumbers() {
    const numberList = Array.from({ length: CONFIG.MAX_LOTTO_NUMBER }, (_, i) => i + 1);
    numberList.sort(() => Math.random() - 0.5);
    return numberList.slice(0, CONFIG.LOTTO_LENGTH);
  }
}

export default LotteryMachine;
