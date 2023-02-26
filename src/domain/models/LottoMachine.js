import Lotto from './Lotto';
import generateRandomNumber from '../../utils/generateRandomNumber';
import { LOTTO, RANKING_THRESHOLD } from '../../constants';

class LottoMachine {
  #lottos = [];

  buyLottos(purchaseAmount) {
    this.#lottos = [];

    new Array(purchaseAmount / LOTTO.price).fill().forEach(() => {
      this.#lottos.push(this.publishLotto());
    });
  }

  publishLotto() {
    return new Lotto(this.generateLottoNumbers());
  }

  generateLottoNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length < LOTTO.numbersLength) {
      const number = generateRandomNumber(LOTTO.minNumber, LOTTO.maxNumber);
      if (!lottoNumbers.includes(number)) lottoNumbers.push(number);
    }

    return lottoNumbers.sort((a, b) => a - b);
  }

  getLottosNumbers() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }

  getRankings(winningNumbers, bonusNumber) {
    const rankings = [];
    this.#lottos.forEach((lotto) => {
      const matchCount = lotto.calculateMatchCount(winningNumbers);
      if (matchCount < RANKING_THRESHOLD) return;
      const ranking = lotto.calculateRanking(matchCount, bonusNumber);
      rankings.push(ranking);
    });

    return rankings;
  }

  getLottosCount() {
    return this.#lottos.length;
  }

  restartLottoGame() {
    this.#lottos = [];
  }
}

export default LottoMachine;
