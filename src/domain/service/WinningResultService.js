/* eslint-disable arrow-parens */
import CONDITION from '../../constant/Condition';
import Lotto from '../entity/Lotto';
import WinningLotto from '../entity/WinningLotto';

class WinningResultService {
  #lottos;

  #winningLotto;

  constructor(lottos, winningLottoCondition) {
    this.#lottos = lottos.map((lotto) => new Lotto(lotto));
    this.#winningLotto = new WinningLotto(winningLottoCondition.numbers);
    this.#winningLotto.setBonusNumber(winningLottoCondition.bonusNumber);
  }

  getWinningResults() {
    return this.#counter(this.#getResults());
  }

  #getResults() {
    return this.#getMatchingCounts().filter((numStr) => Object.keys(CONDITION.winningPrice).includes(numStr));
  }

  #getMatchingCounts() {
    const getLottoResult = (lotto) => this.#winningLotto.getMatchCounts(lotto.getNumbers());
    return this.#lottos.map(getLottoResult);
  }

  #counter(array) {
    return array.reduce((acc, cur) => ((acc[cur] = (acc[cur] || 0) + 1), acc), {});
  }
}

export default WinningResultService;
