import RandomGenerator from '../RandomGenerator';
import { isPositiveInteger } from '../validation';
import Lotto from './Lotto';
import WinningLotto from './WinningLotto';

class LottoMachine {
  static LOTTO_COST = 1000;

  #lottos;
  #winningLotto;

  constructor(money) {
    this.#lottos = this.generateLottos(money);
    this.#winningLotto = new WinningLotto();
  }

  getPrizes() {
    return this.#lottos.map((lotto) => this.#winningLotto.judgePrize(lotto));
  }

  calcLottoAmount(money) {
    const lottoAmount = money / LottoMachine.LOTTO_COST;
    if (!isPositiveInteger(lottoAmount)) throw new Error('유효하지 않은 금액입니다.');
    return lottoAmount;
  }

  generateLottos(money) {
    const amount = this.calcLottoAmount(money);
    return Array.from({ length: amount }, () => {
      return new Lotto(RandomGenerator.pickRandomNumbers());
    });
  }

  setWinningLotto(lottoNumbers) {
    const lotto = new Lotto(lottoNumbers);
    this.#winningLotto.setWinningLotto(lotto);
  }

  setBonusNumber(bonusNumber) {
    this.#winningLotto.setBonusNumber(bonusNumber);
  }

  getLottoNumbers() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }
}

export default LottoMachine;
