import { LOTTO_PRICE, SELECTOR } from './constants/constants';
import { $, $$, divider } from './utils/util';
import validateCharge from './validation';

import LottoManager from './LottoManager';
import LottoMachineView from './views/LottoMachineView';
import { calculateMatchResult, calculateProfitRatio } from './checkResult';

export default class LottoMachine {
  constructor() {
    this.lottoManager = new LottoManager();
    this.lottoMachineView = new LottoMachineView();
    this.setEvent();
    this.lottoMachineView.updateLottoList(this.lottoManager.lottos);
  }

  setEvent() {
    $(SELECTOR.CHARGE_SUBMIT_FORM).addEventListener('submit', this.onSubmitCharge.bind(this));
    $(SELECTOR.SHOW_NUMBER_TOGGLE_INPUT).addEventListener('click', this.reverseLottoStyle.bind(this));
    $(SELECTOR.WINNING_NUMBER_FORM).addEventListener('submit', this.onSubmitWinningNumber.bind(this))
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
    // if ( this.lottoManager.lottos.length === 0 ) return; // 에러 처리 필요
    const winningNumberInputValues = Array.from($$(SELECTOR.WINNING_NUMBER_INPUT))
      .map((numberInput) => Number(numberInput.value));

    const result = this.calculateResult(winningNumberInputValues);
    console.log(result);
  }

  purchase(chargeInputValue) {
    const { quotient: newLottoCount, remainder: remainCharge } = divider(chargeInputValue, LOTTO_PRICE);
    this.lottoManager.generateNewLottos(newLottoCount);
    this.lottoMachineView.updateLottoList(this.lottoManager.lottos);
    this.lottoMachineView.updateChargeInput(remainCharge);
  }

  reverseLottoStyle() {
    const style = $(SELECTOR.SHOW_NUMBER_TOGGLE_INPUT).checked ? 'number' : 'icon';
    this.lottoMachineView.showLottoList[style]();
  }

  calculateResult(winningNumberInputValues) {
    const winningNumbers = winningNumberInputValues.slice(0, 6);
    const bonusNumber = winningNumberInputValues[winningNumberInputValues.length - 1];
    const matchResult = calculateMatchResult(this.lottoManager.lottos, winningNumbers, bonusNumber);
    const profitRatio = calculateProfitRatio(this.lottoManager.lottos.length, matchResult);
    return { matchResult, profitRatio }
  }
}
