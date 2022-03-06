import { NUMBER } from '../constants/number';
import { shuffle } from '../utils/gameUtil';
import { RANK_KEYS } from '../constants/rank';

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

    return this.computeRank(numberMatchCount, isMatchBonus);
  }

  computeRank(numberMatchCount, isMatchBonus) {
    if (numberMatchCount === 6) {
      return RANK_KEYS.FIRST;
    }
    if (numberMatchCount === 5 && isMatchBonus) {
      return RANK_KEYS.SECOND;
    }
    if (numberMatchCount === 5 && !isMatchBonus) {
      return RANK_KEYS.THIRD;
    }
    if (numberMatchCount === 4) {
      return RANK_KEYS.FORTH;
    }
    if (numberMatchCount === 3) {
      return RANK_KEYS.FIFTH;
    }
    return RANK_KEYS.UNRANK;
  }
}

export default Lotto;
