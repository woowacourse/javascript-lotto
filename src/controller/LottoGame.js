import Validator from '../domain/Validator';
import Condition from '../constants/Condition';

const { RESTART_OPTION, PRIZE } = Condition;

class LottoGame {
  /**
   * views와 controller, utils를 외부에서 주입
   * @param {*} views (Input, Output)
   * @param {*} controllers (LottoGenerator, MessageGenerator, StatisticsGenerator)
   * @param {*} utils (retryUntilValid, listenModalClose)
   */
  constructor(views, controllers, utils) {
    this.views = views;
    this.controllers = controllers;
    this.utils = utils;
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
    const money = await this.utils.retryUntilValid(this.getMoney, this);
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
    const winningNumbers = await this.utils.retryUntilValid(this.getWinningNumbers, this);
    return winningNumbers;
  }

  async makeBonusNumber(winningNumbers) {
    const bonusNumber = await this.utils.retryUntilValid(() => this.getBonusNumber(winningNumbers), this);
    return bonusNumber;
  }

  async getRestartOption() {
    const restartOption = await this.views.input.readRestartOrExit();
    Validator.checkReadRestartOrExit(restartOption);
    return restartOption;
  }

  // 웹 모드를 위해서 새로고침을 사용해서 프로그램 다시 시작
  windowReload() {
    if (this.views.mode === 'web') window.location.reload();
  }

  async restartOrExit() {
    if (this.views.mode === 'web') this.utils.listenModalClose();
    const restartOption = await this.utils.retryUntilValid(this.getRestartOption, this);

    if (restartOption === RESTART_OPTION.RESTART) {
      this.windowReload();
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

    this.views.output.printLottoTicketsCount(lengthMessage);
    this.views.output.printPurchaseResultDetail(detailMessage);
  }
}

export default LottoGame;
