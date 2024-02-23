import Validator from '../domain/Validator';
import StatisticsGenerator from './StatisticsGenerator';
import LottoGenerator from './LottoGenerator';
import Input from '../view/Input';
import Output from '../view/Output';
import retryUntilValid from '../utils/retryUntilValid';
import Condition from '../constants/Condition';

const { RESTART_OPTION } = Condition;

const LottoGame = {
  async start() {
    const lottoTickets = await this.purchaseLottoTickets();
    Output.printLottoTicketsPurchaseResult(lottoTickets);

    const winningLotto = await this.makeWinningLotto();
    this.showPrizeStatistics(lottoTickets, winningLotto);

    await this.restartOrExit();
  },

  async getMoney() {
    const money = Validator.validateMoney(await Input.readMoney());
    return money;
  },

  async purchaseLottoTickets() {
    const money = await retryUntilValid(() => this.getMoney());
    return LottoGenerator.createLotto(money);
  },

  async getWinningNumbers() {
    const winningNumbers = await Input.readWinningNumbers();
    return Validator.validateLottoNumbers(winningNumbers.split(',').map(Number));
  },

  async getBonusNumber(winningNumbers) {
    const bonusNumber = await Input.readBonusNumber();
    return Validator.validateBonusNumber(winningNumbers, Number(bonusNumber));
  },

  async makeWinningLotto() {
    const winningNumbers = await retryUntilValid(() => this.getWinningNumbers());
    const bonusNumber = await retryUntilValid(() => this.getBonusNumber(winningNumbers));

    return { winningNumbers, bonusNumber };
  },

  async getRestartOption() {
    const restartOption = await Input.readRestartOrExit();
    return Validator.validateRestartOption(restartOption);
  },

  async restartOrExit() {
    const restartOption = await retryUntilValid(() => this.getRestartOption());

    if (restartOption === RESTART_OPTION.RESTART) {
      await this.start();
    }
  },

  showPrizeStatistics(lottoTickets, winningLotto) {
    const prizes = StatisticsGenerator.calculateAllPrize(lottoTickets, winningLotto);
    const returnOnInvestment = StatisticsGenerator.calculateReturnOnInvestment(prizes);

    Output.printPrizeStatisticsHeader();
    Output.printPrizeDetails(prizes);
    Output.printReturnOnInvestment(returnOnInvestment);
  },
};

export default LottoGame;
