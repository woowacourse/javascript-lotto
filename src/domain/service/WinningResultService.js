import LottoNumberList from '../entity/LottoNumberList';
import WinningLotto from '../entity/WinningLotto';

class WinningResultService {
  #winningLotto;
  #matchCounts;

  constructor(lottos, winningLottoObj) {
    this.#winningLotto = new WinningLotto(winningLottoObj.numbers);
    this.#winningLotto.setBonusNumber(winningLottoObj.bonusNumber);
    this.#getMatchCounts(lottos);
    console.log(this.#matchCounts);
  }

  #getMatchCounts(lottos) {
    this.#matchCounts = lottos
      .map(lotto => new LottoNumberList(lotto))
      .map(lotto => this.#winningLotto.getMatchCounts(lotto.getNumbers()));
  }

  getWinningResult() {
    const result = { 3: 0, 4: 0, 5: 0, '5-1': 0, 6: 0 };
    this.#matchCounts
      .filter(numStr => Object.keys(result).includes(numStr))
      .forEach(matched => {
        result[matched] += 1;
      });
    return result;
  }
}

export default WinningResultService;
