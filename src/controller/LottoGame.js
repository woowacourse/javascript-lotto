import Validator from '../domain/Validator';
import retryUntilValid from '../utils/retryUntilValid';
import Condition from '../constants/Condition';

const { RESTART_OPTION, PRIZE } = Condition;

class LottoGame {
  /**
   * views와 controller를 외부에서 주입
   * @param {*} views (Input, Output)
   * @param {*} controllers (LottoGenerator, MessageGenerator, StatisticsGenerator)
   */
  constructor(views, controllers) {
    this.views = views;
    this.controllers = controllers;
  }

  async start() {
    const lottoTickets = await this.purchaseLottoTickets();
    this.showLottoTicketsPurchaseResult(lottoTickets);

    const winningLotto = await this.makeWinningLotto();
    this.showPrizeStatistics(lottoTickets, winningLotto);

    await this.restartOrExit();
  }

  async getMoney() {
    const money = await this.views.input.readMoney();
    Validator.checkReadMoney(money);
    return money;
  }

  async purchaseLottoTickets() {
    const money = await retryUntilValid(this.getMoney, this);
    const lottoTickets = this.controllers.lotto.createLotto(money);
    return lottoTickets;
  }

  async getWinningNumbers() {
    const winningNumbers = await this.views.input.readWinningNumbers();
    const separatedWinningNumbers = winningNumbers.split(',').map((number) => Number(number));
    Validator.checkLottoNumbers(separatedWinningNumbers);

    return separatedWinningNumbers;
  }

  async getBonusNumber(winningNumbers) {
    const bonusNumber = Number(await this.views.input.readBonusNumber());
    Validator.checkReadBonusNumber(winningNumbers, bonusNumber);

    return bonusNumber;
  }

  async makeWinningLotto() {
    const winningNumbers = await this.makeWinningNumbers();
    const bonusNumber = await this.makeBonusNumber(winningNumbers);

    return { winningNumbers, bonusNumber };
  }

  async makeWinningNumbers() {
    const winningNumbers = await retryUntilValid(this.getWinningNumbers, this);
    return winningNumbers;
  }

  async makeBonusNumber(winningNumbers) {
    const bonusNumber = await retryUntilValid(() => this.getBonusNumber(winningNumbers), this);
    return bonusNumber;
  }

  async getRestartOption() {
    const restartOption = await this.views.input.readRestartOrExit();
    Validator.checkReadRestartOrExit(restartOption);
    return restartOption;
  }

  async restartOrExit() {
    const restartOption = await retryUntilValid(this.getRestartOption, this);

    if (restartOption === RESTART_OPTION.RESTART) {
      await this.start();
    }
  }

  showPrizeStatistics(lottoTickets, winningLotto) {
    const prizes = this.controllers.statistics.calculateAllPrize(lottoTickets, winningLotto);

    this.showPrizeDetails(prizes);
    this.showReturnOnInvestment(prizes);
  }

  showPrizeDetails(prizes) {
    const prizeDetail = PRIZE.map(([rank, detail]) => {
      const prizeInfo = { rank, detail, count: prizes.filter((prize) => prize === rank).length };
      return this.controllers.message.prizeDetail(prizeInfo);
    });

    this.views.output.printPrizeStatisticsHeader();
    this.views.output.printPrizeDetails(prizeDetail);
  }

  showReturnOnInvestment(prizes) {
    const returnOnInvestment = this.controllers.statistics.calculateReturnOnInvestment(prizes);
    const message = this.controllers.message.returnOnInvestment(returnOnInvestment);

    this.views.output.printReturnOnInvestment(message);
  }

  showLottoTicketsPurchaseResult(lottoTickets) {
    const lengthMessage = this.controllers.message.lottoTicketsCount(lottoTickets.length);
    const detailMessage = this.controllers.message.purchaseResultDetail(lottoTickets);

    this.views.output.printLottoTickesCount(lengthMessage);
    this.views.output.printPurchaseResultDetail(detailMessage);
  }
}

export default LottoGame;
