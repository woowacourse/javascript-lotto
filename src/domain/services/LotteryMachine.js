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
    const lotto = [];
    while (lotto.length < CONFIG.LOTTO_RANK_LENGTH) {
      const randomNumber = Math.ceil(Math.random() * CONFIG.MAX_LOTTO_NUMBER);
      if (lotto.includes(randomNumber)) continue;
      lotto.push(randomNumber);
    }
    return new Lotto(lotto);
  }
}

export default LotteryMachine;
