import Lotto from '../domain/Lotto';
import LottoValidator from '../domain/LottoValidator';
import Condition from '../constants/Condition';

const { LOTTO } = Condition;

const REWARD = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
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

  calculateAllPrize(lottoTickets) {
    return lottoTickets.map((lottoTicket) =>
      lottoTicket.calculatePrize(this.#winningNumbers, this.#bonusNumber),
    );
  }

  calculateReturnOnInvestment(prizes) {
    const totalReward = prizes.reduce((acc, cur) => (acc += REWARD[cur]), 0);
    const investment = prizes.length * 1000;
    return Math.round((totalReward / investment) * 100 * 100) / 100;
  }
}

export default LottoGame;
