import Lotto from '../domain/Lotto';
import LottoValidator from '../domain/LottoValidator';
import MoneyValidator from '../domain/MoneyValidator';
import SystemValidator from '../domain/SystemValidator';
import Input from '../view/Input';
import Output from '../view/Output';
import Random from '../utils/Random';
import retryUntilValid from '../utils/retryUntilValid';
import Condition from '../constants/Condition';

const { RANK, PRIZE, LOTTO, MONEY, FORMATTING, BLANK } = Condition;

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
    return money;
  }

  #validateLottoNumbers(numbers) {
    LottoValidator.validateNumbersLength(numbers);
    LottoValidator.validateNumbersDuplicate(numbers);
    LottoValidator.validateNumbersType(numbers);
    LottoValidator.validateNumbersRange(numbers);
    return numbers;
  }

  #validateBonusNumber(winningNumbers, number) {
    LottoValidator.validateNumbersDuplicate([...winningNumbers, number]);
    LottoValidator.validateNumbersType([number]);
    LottoValidator.validateNumbersRange([number]);
    return number;
  }

  async getMoney() {
    const money = this.#validateMoney(await Input.readMoney());
    return money;
  }

  async getWinningNumbers() {
    const winningNumbers = await Input.readWinningNumbers();

    const separatedWinningNumbers = this.#validateLottoNumbers(
      winningNumbers.split(',').map((number) => Number(number)),
    );

    return separatedWinningNumbers;
  }

  async getBonusNumber(winningNumbers) {
    const bonusNumber = Number(await Input.readBonusNumber());
    return this.#validateBonusNumber(winningNumbers, bonusNumber);
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
    return Array.from({ length: money / MONEY.UNIT }).map(() => {
      const numbers = Random.pickNumbersInRangeByRule({
        start: LOTTO.NUMBER_RANGE_MIN,
        end: LOTTO.NUMBER_RANGE_MAX,
        count: LOTTO.NUMBER_LENGTH,
      });
      return new Lotto(this.#validateLottoNumbers(numbers));
    });
  }

  calculateAllPrize(lottoTickets, winningLotto) {
    const { winningNumbers, bonusNumber } = winningLotto;
    return lottoTickets.map((lottoTicket) =>
      lottoTicket.calculatePrize(winningNumbers, bonusNumber),
    );
  }

  calculateReturnOnInvestment(prizes) {
    const totalReward = prizes.reduce(
      (acc, cur) =>
        (acc += cur !== RANK.LAST_PLACE ? PRIZE.find(([rank]) => rank === cur)[1].REWARD : BLANK),
      0,
    );

    const { PERCENT, ROUND } = FORMATTING;
    return Math.round((totalReward / (prizes.length * MONEY.UNIT)) * PERCENT * ROUND) / ROUND;
  }
}

export default LottoGame;
