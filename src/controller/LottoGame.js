import Lotto from '../domain/Lotto';
import LottoValidator from '../domain/LottoValidator';
import MoneyValidator from '../domain/MoneyValidator';
import SystemValidator from '../domain/SystemValidator';
import Input from '../view/Input';
import Output from '../view/Output';
import Random from '../utils/Random';
import retryUntilValid from '../utils/retryUntilValid';

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
    const money = await retryUntilValid(this.getMoney, this);
    const lottoTickets = this.createLotto(money);
    Output.printLottoTicketsPurchaseResult(lottoTickets);
    const winningNumbers = await retryUntilValid(this.getWinningNumbers, this);
    const bonusNumber = await retryUntilValid(() => this.getBonusNumber(winningNumbers), this);
    const winningLotto = { winningNumbers, bonusNumber };
    this.makePrizeStatistics(lottoTickets, winningLotto);
    await this.restartOrExit();
  }

  async restartOrExit() {
    const restartOption = await retryUntilValid(this.getRestartOption, this);

    if (restartOption === 'y') {
      await this.start();
    }
  }

  #validateMoney(money) {
    MoneyValidator.validateMoneyType(money);
    MoneyValidator.validateMoneyMinimum(money);
    MoneyValidator.validateMoneyUnit(money);
  }

  #validateLottoNumbers(numbers) {
    LottoValidator.validateNumbersLength(numbers);
    LottoValidator.validateNumbersDuplicate(numbers);
    LottoValidator.validateNumbersType(numbers);
    LottoValidator.validateNumbersRange(numbers);
  }

  #validateBonusNumber(winningNumbers, number) {
    LottoValidator.validateNumbersDuplicate([...winningNumbers, number]);
    LottoValidator.validateNumbersType([number]);
    LottoValidator.validateNumbersRange([number]);
  }

  async getMoney() {
    const money = await Input.readMoney();
    this.#validateMoney(money);
    return money;
  }

  async getWinningNumbers() {
    const winningNumbers = await Input.readWinningNumbers();
    const separatedWinningNumbers = winningNumbers.split(',').map((number) => Number(number));

    this.#validateLottoNumbers(separatedWinningNumbers);

    return separatedWinningNumbers;
  }

  async getBonusNumber(winningNumbers) {
    const bonusNumber = Number(await Input.readBonusNumber());
    this.#validateBonusNumber(winningNumbers, bonusNumber);
    return bonusNumber;
  }

  makePrizeStatistics(lottoTickets, winningLotto) {
    const prizes = this.calculateAllPrize(lottoTickets, winningLotto);
    const returnOnInvestment = this.calculateReturnOnInvestment(prizes);
    Output.printPrizeDetails(prizes);
    Output.printReturnOnInvestment(returnOnInvestment);
  }

  async getRestartOption() {
    const restartOption = await Input.readRestartOrExit();
    SystemValidator.validateOptionCharacter(restartOption);
    return restartOption;
  }

  createLotto(money) {
    return Array.from({ length: money / 1000 }).map(() => {
      const numbers = Random.pickNumbersInRangeByRule({ start: 1, end: 45, count: 6 });
      this.#validateLottoNumbers(numbers);
      return new Lotto(numbers);
    });
  }

  calculateAllPrize(lottoTickets, winningLotto) {
    const { winningNumbers, bonusNumber } = winningLotto;
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
