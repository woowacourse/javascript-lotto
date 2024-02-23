import Validator from '../domain/Validator';
import StatisticsGenerator from './StatisticsGenerator';
import LottoGenerator from './LottoGenerator';
import Input from '../view/Input';
import Output from '../view/Output';
import retryUntilValid from '../utils/retryUntilValid';
import Condition from '../constants/Condition';
import MessageGenerator from './MessageGenerator';

const { RESTART_OPTION, PRIZE } = Condition;

const LottoGame = {
  async start() {
    const lottoTickets = await this.purchaseLottoTickets();
    this.showLottoTicketsPurchaseResult(lottoTickets);

    const winningLotto = await this.makeWinningLotto();
    this.showPrizeStatistics(lottoTickets, winningLotto);

    await this.restartOrExit();
  },

  async getMoney() {
    const money = Validator.validateMoney(await Input.readMoney());
    return money;
  },

  async purchaseLottoTickets() {
    const money = await retryUntilValid(this.getMoney, this);
    const lottoTickets = LottoGenerator.createLotto(money);
    return lottoTickets;
  },

  async getWinningNumbers() {
    const winningNumbers = await Input.readWinningNumbers();

    const separatedWinningNumbers = Validator.validateLottoNumbers(
      winningNumbers.split(',').map((number) => Number(number)),
    );

    return separatedWinningNumbers;
  },

  async getBonusNumber(winningNumbers) {
    const bonusNumber = Number(await Input.readBonusNumber());
    return Validator.validateBonusNumber(winningNumbers, bonusNumber);
  },

  async makeWinningLotto() {
    const winningNumbers = await this.makeWinningNumbers();
    const bonusNumber = await this.makeBonusNumber();

    return { winningNumbers, bonusNumber };
  },

  async makeWinningNumbers() {
    const winningNumbers = await retryUntilValid(this.getWinningNumbers, this);
    return winningNumbers;
  },

  async makeBonusNumber(winningNumbers) {
    const bonusNumber = await retryUntilValid(() => this.getBonusNumber(winningNumbers), this);
    return bonusNumber;
  },

  async getRestartOption() {
    const restartOption = await Input.readRestartOrExit();
    return Validator.validateRestartOption(restartOption);
  },

  async restartOrExit() {
    const restartOption = await retryUntilValid(this.getRestartOption, this);

    if (restartOption === RESTART_OPTION.RESTART) {
      await this.start();
    }
  },

  showPrizeStatistics(lottoTickets, winningLotto) {
    const prizes = StatisticsGenerator.calculateAllPrize(lottoTickets, winningLotto);

    this.showPrizeDetails(prizes);
    this.showReturnOnInvestment(prizes);
  },

  showPrizeDetails(prizes) {
    const prizeDetail = PRIZE.map(([rank, detail]) => {
      const prizeInfo = { rank, detail, count: prizes.filter((prize) => prize === rank).length };
      return MessageGenerator.prizeDetail(prizeInfo);
    });

    Output.printPrizeStatisticsHeader();
    Output.printPrizeDetails(prizeDetail);
  },

  showReturnOnInvestment(prizes) {
    const returnOnInvestment = StatisticsGenerator.calculateReturnOnInvestment(prizes);
    Output.printReturnOnInvestment(MessageGenerator.returnOnInvestment(returnOnInvestment));
  },

  showLottoTicketsPurchaseResult(lottoTickets) {
    Output.printLottoTickesCount(MessageGenerator.lottoTicketsCount(lottoTickets.length));
    Output.printPurchaseResultDetail(MessageGenerator.purchaseResultDetail(lottoTickets));
  },
};

export default LottoGame;
