/* eslint-disable arrow-parens */
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

  getWinningResult() {
    const result = {
      3: 0,
      4: 0,
      5: 0,
      '5-1': 0,
      6: 0,
    };

    this.#lottos
      .map((lotto) => this.#winningLotto.getMatchCounts(lotto.getNumbers()))
      .filter((numStr) => Object.keys(result).includes(numStr))
      .forEach((matched) => {
        result[matched] += 1;
      });
    return result;
  }
}

export default WinningResultService;
