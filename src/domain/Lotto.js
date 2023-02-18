import { LottoStaticValue } from '../constants/Constants.js';
import Convertor from '../utils/Convertor.js';
import Validation from '../utils/Validation.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    Validation.testLottoNumbers(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  getStringifiedNumbers() {
    return Convertor.stringifyLotto(this.#numbers);
  }

  getMatchState({ winningNumbers, bonusNumber }) {
    const MATCH_COUNT = this.#getMatchCount(winningNumbers);
    const BONUS_MATCH = this.#hasBonusNumber(bonusNumber);

    if (MATCH_COUNT === LottoStaticValue.MATCH_FIVE && BONUS_MATCH) {
      return LottoStaticValue.MATCH_FIVE_AND_BONUS;
    }

    return MATCH_COUNT;
  }

  #getMatchCount(winningNumbers) {
    return (
      LottoStaticValue.TOTAL_ARRAY_LENGTH - new Set([...winningNumbers, ...this.#numbers]).size
    );
  }

  #hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
