import LotteryTicketManager from './LotteryTicketManager';
import LottoMachineView from './views/LottoMachineView';

import { LOTTERY_TICKET_PRICE, SELECTOR } from './constants/constants';
import { $, $$, divider } from './utils/util';
import { validateCharge, validateWinningNumbers } from './validation';
import { calculateMatchResult, calculateProfitRatio } from './checkResult';

export default class LottoMachine {
  constructor() {
    this.lotteryTicketManager = new LotteryTicketManager();
    this.lottoMachineView = new LottoMachineView();
    this.setEvent();
    this.lottoMachineView.updateLottoList(this.lotteryTicketManager.tickets);
  }

  setEvent() {
    $(SELECTOR.CHARGE_SUBMIT_FORM).addEventListener('submit', this.onSubmitCharge.bind(this));
    $(SELECTOR.SHOW_NUMBER_TOGGLE_INPUT).addEventListener('click', this.switchLottoListStyle.bind(this));
    $(SELECTOR.WINNING_NUMBER_FORM).addEventListener('submit', this.onSubmitWinningNumber.bind(this));
    $('#result-modal-close-button').addEventListener('click', this.onClickCloseResultModalButton.bind(this));
    $('#restart-button').addEventListener('click', this.onClickRestartButton.bind(this));
  }
  
  onSubmitCharge(event) {
    event.preventDefault();
    const chargeInputValue = Number($(SELECTOR.CHARGE_INPUT).value);
    try {
      validateCharge(chargeInputValue);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.purchaseLotteryTicket(chargeInputValue);
  }

  onClickCloseResultModalButton() {
    this.lottoMachineView.closeWinningResultModal();
  }

  onClickRestartButton() {
    this.lotteryTicketManager.initialize();
    this.lottoMachineView.initialize(this.lotteryTicketManager.tickets);
  }

  onSubmitWinningNumber(event) {
    event.preventDefault();
    const winningNumberInputValues = Array.from($$(SELECTOR.WINNING_NUMBER_INPUT))
      .map(numberInput => Number(numberInput.value)).filter(number => number !== 0);
    try {
      this.lotteryTicketManager.checkPurchasedTicketExist();
      validateWinningNumbers(winningNumberInputValues);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.showWinningResultModal(winningNumberInputValues);
  }

  purchaseLotteryTicket(chargeInputValue) {
    const { remainCharge } = this.lotteryTicketManager.purchaseLotteryTicket(chargeInputValue);
    this.lottoMachineView.updateLottoList(this.lotteryTicketManager.tickets);
    this.lottoMachineView.updateChargeInput(remainCharge);
  }

  switchLottoListStyle() {
    const style = $(SELECTOR.SHOW_NUMBER_TOGGLE_INPUT).checked ? 'number' : 'icon';
    this.lottoMachineView.showLottoList[style]();
  }

  showWinningResultModal(winningNumberInputValues) {
    const result = this.calculateWinningResult(winningNumberInputValues);
    this.lottoMachineView.openWinningResultModal(result);
  }

  calculateWinningResult(winningNumberInputValues) {
    const winningNumbers = winningNumberInputValues.slice(0, 6);
    const bonusNumber = winningNumberInputValues[winningNumberInputValues.length - 1];
    const matchResult = calculateMatchResult(this.lotteryTicketManager.tickets, winningNumbers, bonusNumber);
    const profitRatio = calculateProfitRatio(this.lotteryTicketManager.tickets.length, matchResult) || 0;
    return { matchResult, profitRatio }
  }
}
