import Input from '../view/Input';
import Output from '../view/Output';
import retryUntilValid from '../utils/retryUntilValid';
import Condition from '../constants/Condition';
import StatisticsGenerator from './StatisticsGenerator';
import LottoGenerator from './LottoGenerator';
import Validator from '../domain/Validator';

const { RESTART_OPTION } = Condition;

class LottoGame {
  async start() {
    const lottoTickets = await this.purchaseLottoTickets();
    Output.printLottoTicketsPurchaseResult(lottoTickets);

    const winningLotto = await this.makeWinningLotto();
    this.showPrizeStatistics(lottoTickets, winningLotto);

    await this.restartOrExit();
  }

  async getMoney() {
    const money = Validator.validateMoney(await Input.readMoney());
    return money;
  }

  async purchaseLottoTickets() {
    const money = await retryUntilValid(this.getMoney, this);
    const lottoTickets = LottoGenerator.createLotto(money);
    return lottoTickets;
  }

  async getWinningNumbers() {
    const winningNumbers = await Input.readWinningNumbers();

    const separatedWinningNumbers = Validator.validateLottoNumbers(
      winningNumbers.split(',').map((number) => Number(number)),
    );

    return separatedWinningNumbers;
  }

  async getBonusNumber(winningNumbers) {
    const bonusNumber = Number(await Input.readBonusNumber());
    return Validator.validateBonusNumber(winningNumbers, bonusNumber);
  }

  async makeWinningLotto() {
    const winningNumbers = await retryUntilValid(this.getWinningNumbers, this);
    const bonusNumber = await retryUntilValid(() => this.getBonusNumber(winningNumbers), this);

    return { winningNumbers, bonusNumber };
  }

  async getRestartOption() {
    const restartOption = await Input.readRestartOrExit();
    return Validator.validateRestartOption(restartOption);
  }

  async restartOrExit() {
    const restartOption = await retryUntilValid(this.getRestartOption, this);

    if (restartOption === RESTART_OPTION.RESTART) {
      await this.start();
    }
  }

  showPrizeStatistics(lottoTickets, winningLotto) {
    const prizes = StatisticsGenerator.calculateAllPrize(lottoTickets, winningLotto);
    const returnOnInvestment = StatisticsGenerator.calculateReturnOnInvestment(prizes);

    Output.printPrizeStatisticsHeader();
    Output.printPrizeDetails(prizes);
    Output.printReturnOnInvestment(returnOnInvestment);
  }
}

export default LottoGame;
