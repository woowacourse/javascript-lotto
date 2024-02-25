import LOTTO_RULE from '../../constants/rules/lottoRule';
import generateRandomNumberInRange from '../../util/generateRandomNumberInRange';
import BonusNumber from './BonusNumber';
import Lotto from './Lotto';
import { calculateLottoRanks } from '../calculateStatistics';

class LottoMachine {
  /**
   * @typedef {Object} winningNumbers
   * @property {Object} Lotto - 당첨 번호 로또
   * @property {number} bonusNumber - 보너스 번호
   */
  #winningNumbers = new Map();
  #lottos;

  /**
   *
   * @param {Object} Money
   */
  constructor(money) {
    this.#drawLottos(money.count);
  }

  #drawLottos(moneyCount) {
    this.#lottos = Array(moneyCount)
      .fill([])
      .map(() => {
        return new Lotto(this.#generateRandomLottoNumbers());
      });
  }

  #generateRandomLottoNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length !== LOTTO_RULE.LOTTO_LENGTH) {
      const randomNumber = generateRandomNumberInRange();

      this.#pushNotRedundantNumber(lottoNumbers, randomNumber);
    }
    return lottoNumbers;
  }

  #pushNotRedundantNumber(lottoNumbers, randomNumber) {
    if (!lottoNumbers.includes(randomNumber)) {
      lottoNumbers.push(randomNumber);
    }
  }

  countLottoRanks(lottos = this.#lottos) {
    const totalLottoRanks = calculateLottoRanks(lottos, this.#winningNumbers);

    return totalLottoRanks;
  }

  set winningLotto(lottoInputs) {
    this.#winningNumbers.set(
      'winningLotto',
      new Lotto(lottoInputs.split(LOTTO_RULE.NUMBER_DELIMITER).map(input => Number(input.trim()))),
    );
  }

  set bonusNumber(number) {
    this.#winningNumbers.set('bonusNumber', new BonusNumber(number, this.#winningNumbers.get('winningLotto')));
  }

  get lottos() {
    return this.#lottos.slice();
  }
}

export default LottoMachine;
