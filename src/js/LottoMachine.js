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
    this.purchase(chargeInputValue);
  }

  onSubmitWinningNumber(event) {
    event.preventDefault();
    // if ( this.lotteryTicketManager.tickets.length === 0 ) return; // 에러 처리 필요
    const winningNumberInputValues = Array.from($$(SELECTOR.WINNING_NUMBER_INPUT))
      .map(numberInput => Number(numberInput.value))
      .filter(number => number !== 0);
    try {
      validateWinningNumbers(winningNumberInputValues);
    } catch (error) {
      alert(error.message);
      return;
    }
    const result = this.calculateResult(winningNumberInputValues);
    this.lottoMachineView.openResultModal(result);
  }

  onClickCloseResultModalButton() {
    this.lottoMachineView.closeResultModal();
  }

  onClickRestartButton() {
    this.lotteryTicketManager.initialize();
    this.lottoMachineView.initialize(this.lotteryTicketManager.tickets);
  }

  purchase(chargeInputValue) {
    const { quotient: newLottoCount, remainder: remainCharge } = divider(chargeInputValue, LOTTERY_TICKET_PRICE);
    this.lotteryTicketManager.generateNewLottos(newLottoCount);
    this.lottoMachineView.updateLottoList(this.lotteryTicketManager.tickets);
    this.lottoMachineView.updateChargeInput(remainCharge);
  }

  switchLottoListStyle() {
    const style = $(SELECTOR.SHOW_NUMBER_TOGGLE_INPUT).checked ? 'number' : 'icon';
    this.lottoMachineView.showLottoList[style]();
  }

  calculateResult(winningNumberInputValues) {
    const winningNumbers = winningNumberInputValues.slice(0, 6);
    const bonusNumber = winningNumberInputValues[winningNumberInputValues.length - 1];
    const matchResult = calculateMatchResult(this.lotteryTicketManager.tickets, winningNumbers, bonusNumber);
    const profitRatio = calculateProfitRatio(this.lotteryTicketManager.tickets.length, matchResult) || 0;
    return { matchResult, profitRatio }
  }
}
