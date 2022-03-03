import { NUMBER } from '../constants/number';
import { shuffle } from '../utils/gameUtil';
import { computeRank } from '../utils/rank';

class Lotto {
  #lottoNumbers = null;

  constructor() {
    this.#createLottoNumbers();
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  #createLottoNumbers() {
    const lottoNumbers = shuffle([...new Array(NUMBER.LOTTO_MAX_NUMBER)].map((_, idx) => idx + 1));

    this.#lottoNumbers = lottoNumbers.slice(0, NUMBER.LOTTO_NUMBER_LENGTH);
  }

  computeWinResult(winningNumbers, bonusNumber) {
    const { length: numberMatchCount } = this.#lottoNumbers.filter((number) =>
      winningNumbers.includes(number)
    );
    const isMatchBonus = this.#lottoNumbers.includes(bonusNumber);

    return computeRank(numberMatchCount, isMatchBonus);
  }
}

export default Lotto;
