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
    const lotto = this.pickRandomLottoNumbers();
    return new Lotto(lotto);
  }

  pickRandomLottoNumbers(){
    const lottoRangeList = Array.from({ length: CONFIG.MAX_LOTTO_NUMBER }, (_, i) => i + 1);
    lottoRangeList.sort(() => Math.random() - 0.5);
    return lottoRangeList.slice(0, CONFIG.LOTTO_LENGTH);
  }
}

export default LotteryMachine;
