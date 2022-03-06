import LotteryTicketManager from './LotteryTicketManager';
import LottoMachineView from './views/LottoMachineView';

import { validateCharge, validateWinningNumbers } from './validation';
import { calculateMatchResult, calculateProfitRatio } from './checkResult';

export default class LottoMachine {
  constructor() {
    this.lotteryTicketManager = new LotteryTicketManager();
    this.lottoMachineView = new LottoMachineView();
    this.bindEvent();
  }

  bindEvent() {
    this.lottoMachineView.app.addEventListener('purchaseTicket', this.purchaseLotteryTicket.bind(this));
    this.lottoMachineView.app.addEventListener('checkWinningResult', this.checkWinningResult.bind(this));
    this.lottoMachineView.app.addEventListener('restart', this.restart.bind(this));
  }
  
  purchaseLotteryTicket(event) {
    const { chargeInputValue } = event.detail;
    try {
      validateCharge(chargeInputValue);
    } catch (error) {
      alert(error.message);
      return;
    }
    const { remainCharge } = this.lotteryTicketManager.purchaseLotteryTicket(chargeInputValue);
    this.lottoMachineView.updateOnPurchase(this.lotteryTicketManager.tickets, remainCharge);
  }

  checkWinningResult(event) {
    const { winningNumberInputValues } = event.detail;
    try {
      this.lotteryTicketManager.checkPurchasedTicketExist();
      validateWinningNumbers(winningNumberInputValues);
    } catch (error) {
      alert(error.message);
      return;
    }
    const winningResult = this.calculateWinningResult(winningNumberInputValues);
    this.lottoMachineView.updateOnCheckWinningResult(winningResult);
  }

  restart() {
    this.lotteryTicketManager.initialize();
    this.lottoMachineView.initialize(this.lotteryTicketManager.tickets);
  }

  calculateWinningResult(winningNumberInputValues) {
    const winningNumbers = winningNumberInputValues.slice(0, 6);
    const bonusNumber = winningNumberInputValues[winningNumberInputValues.length - 1];
    const matchResult = calculateMatchResult(this.lotteryTicketManager.tickets, winningNumbers, bonusNumber);
    const profitRatio = calculateProfitRatio(this.lotteryTicketManager.tickets.length, matchResult) || 0;
    return { matchResult, profitRatio }
  }
}
