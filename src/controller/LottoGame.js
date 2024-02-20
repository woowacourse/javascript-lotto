import Lotto from '../domain/Lotto';
import LottoValidator from '../domain/LottoValidator';
import Condition from '../constants/Condition';

const { LOTTO } = Condition;

class LottoGame {
  #winningNumbers;

  #bonusNumber;

  #validateNumbers(numbers, length) {
    LottoValidator.validateNumbersLength(numbers, length);
    LottoValidator.validateNumbersDuplicate(numbers);
    LottoValidator.validateNumbersType(numbers);
    LottoValidator.validateNumbersRange(numbers);
  }

  createLotto(money) {
    return Array.from({ length: money / 1000 }).map(() => {
      const numbers = [1, 2, 3, 4, 5, 6];
      this.#validateNumbers(numbers, LOTTO.NUMBER_LENGTH);
      return new Lotto(numbers);
    });
  }

  createWinningNumbers(numbers) {
    this.#validateNumbers(numbers, LOTTO.NUMBER_LENGTH);
    this.#winningNumbers = numbers;
  }

  createBonusNumber(number) {
    this.#validateNumbers([...this.#winningNumbers, number], 7);
    this.#bonusNumber = number;
  }

  calculatePrize(lottoTickets) {
    // TODO:
  }
}

export default LottoGame;
