import Lotto from '../domain/Lotto';
import LottoValidator from '../domain/LottoValidator';
import Condition from '../constants/Condition';

const { LOTTO } = Condition;

const PRIZE = {
  6: 1,
  5: 3,
  4: 4,
  3: 5,
  2: 0,
  1: 0,
  0: 0,
};

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

  compareBonus(lottoTicket) {
    return lottoTicket.getNumbers().includes(this.#bonusNumber) ? 2 : 3;
  }

  calculatePrize(lottoTicket) {
    const prize =
      PRIZE[
        lottoTicket.getNumbers().filter((number) => this.#winningNumbers.includes(number)).length
      ];

    return prize === 3 ? this.compareBonus(lottoTicket) : prize;
  }
}

export default LottoGame;
