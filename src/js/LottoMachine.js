import { LOTTO_PRICE, SELECTOR } from './constants/constants';
import { $, $$, divider } from './utils/util';
import { validateCharge, validateWinnerNumbers } from './validation';

import LottoManager from './LottoManager';
import LottoMachineView from './views/LottoMachineView';

export default class LottoMachine {
  constructor() {
    this.lottoManager = new LottoManager();
    this.lottoMachineView = new LottoMachineView();
    this.#setEvent();
  }

  #setEvent() {
    $(SELECTOR.CHARGE_SUBMIT_FORM).addEventListener('submit', this.#onSubmitCharge.bind(this));
    $(SELECTOR.SHOW_NUMBER_TOGGLE_INPUT).addEventListener('click', this.#reverseLottoStyle.bind(this));
    $(SELECTOR.WINNER_NUMBER_SUBMIT_FORM).addEventListener('submit', this.#onSubmitWinnerNumber.bind(this));
  }

  #onSubmitCharge(event) {
    event.preventDefault();
    const chargeInputNumber = Number($(SELECTOR.CHARGE_INPUT).value);
    try {
      validateCharge(chargeInputNumber);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.lottoMachineView.blockInput();
    this.#purchase(chargeInputNumber);
  }

  #purchase(chargeInputNumber) {
    const { quotient: newLottoCount, remainder: remainCharge } = divider(chargeInputNumber, LOTTO_PRICE);
    this.lottoManager.generateNewLottos(newLottoCount);
    this.lottoMachineView.updateLottoList(this.lottoManager.lottos);
    this.lottoMachineView.updateChargeInput(remainCharge);
  }

  #reverseLottoStyle() {
    if ($(SELECTOR.SHOW_NUMBER_TOGGLE_INPUT).checked) {
      this.lottoMachineView.showLottoNumberList();
      return;
    }
    this.lottoMachineView.showLottoIconList();
  }

  #onSubmitWinnerNumber(event) {
    event.preventDefault();
    this.winnerNumbers = new Set();
    [...$$('input', $(SELECTOR.WINNER_NUMBER_SUBMIT_FORM))].forEach(winnerNumber =>
      this.winnerNumbers.add(Number(winnerNumber.value))
    );
    try {
      validateWinnerNumbers(this.winnerNumbers);
    } catch (error) {
      alert(error.message);
    }
  }
}
