import Lotto from '../domain/Lotto';
import LottoValidator from '../domain/LottoValidator';
import MoneyValidator from '../domain/MoneyValidator';
import Condition from '../constants/Condition';
import Input from '../view/Input';
import Output from '../view/Output';
import Random from '../utils/Random';
import retryUntilValid from '../utils/retryUntilValid';

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
  async start() {
    while (true) {
      const money = await retryUntilValid(this.getMoney, this);

      const lottoTickets = this.createLotto(money);

      Output.printLottoTicketsCount(lottoTickets);
      Output.printAscendingOrderLottoTickets(lottoTickets);

      const winningNumbers = await retryUntilValid(this.getWinningNumbers, this);
      const bonusNumber = await retryUntilValid(() => this.getBonusNumber(winningNumbers), this);

      const prizes = this.calculateAllPrize(lottoTickets, winningNumbers, bonusNumber);
      const returnOnInvestment = this.calculateReturnOnInvestment(prizes);

      Output.printPrizeDetails(prizes);
      Output.printReturnOnInvestment(returnOnInvestment);

      const input = Input.readRestartOrExit();

      if (input === 'n') break;
    }
  }

  #validateMoney(money) {
    MoneyValidator.validateMoneyType(money);
    MoneyValidator.validateMoneyMinimum(money);
    MoneyValidator.validateMoneyUnit(money);
  }

  #validateNumbers(numbers, length) {
    LottoValidator.validateNumbersLength(numbers, length);
    LottoValidator.validateNumbersDuplicate(numbers);
    LottoValidator.validateNumbersType(numbers);
    LottoValidator.validateNumbersRange(numbers);
  }

  async getMoney() {
    const money = await Input.readMoney();

    this.#validateMoney(money);

    return money;
  }

  async getWinningNumbers() {
    const winningNumbers = await Input.readWinningNumbers();
    const separatedWinningNumbers = winningNumbers.split(',').map((number) => Number(number));

    this.#validateNumbers(separatedWinningNumbers, LOTTO.NUMBER_LENGTH);

    return separatedWinningNumbers;
  }

  async getBonusNumber(winningNumbers) {
    const bonusNumber = Number(await Input.readBonusNumber());
    this.#validateNumbers([...winningNumbers, bonusNumber], 7);

    return bonusNumber;
  }

  createLotto(money) {
    return Array.from({ length: money / 1000 }).map(() => {
      const numbers = Random.pickNumbersInRangeByRule({ start: 1, end: 45, count: 6 });
      this.#validateNumbers(numbers, LOTTO.NUMBER_LENGTH);
      return new Lotto(numbers);
    });
  }

  calculateAllPrize(lottoTickets, winningNumbers, bonusNumber) {
    return lottoTickets.map((lottoTicket) =>
      lottoTicket.calculatePrize(winningNumbers, bonusNumber),
    );
  }

  calculateReturnOnInvestment(prizes) {
    const totalReward = prizes.reduce((acc, cur) => (acc += REWARD[cur]), 0);
    const investment = prizes.length * 1000;
    return Math.round((totalReward / investment) * 100 * 100) / 100;
  }
}

export default LottoGame;
