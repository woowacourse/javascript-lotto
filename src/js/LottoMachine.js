import { ID, LOTTO_NUMBER, LOTTO_PRICE, LOTTO_PRIZE, SELECTOR } from './constants/constants';
import { $, $$, divider } from './utils/util';
import { validateCharge, validateShowResult, validateWinnerNumbers } from './validation';

import LottoManager from './LottoManager';
import LottoMachineView from './views/LottoMachineView';

export default class LottoMachine {
  #closeModalIfClickOutOfModalBind;

  #closeModalwithESCBind;

  constructor() {
    this.lottoManager = new LottoManager();
    this.lottoMachineView = new LottoMachineView();
    this.#closeModalIfClickOutOfModalBind = this.#closeModalIfClickOutOfModal.bind(this);
    this.#closeModalwithESCBind = this.#closeModalwithESC.bind(this);
    this.#setEvent();
  }

  #setEvent() {
    this.#makeAutoFocus();
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
    this.lottoMachineView.setInputDisabled(true);
    this.#purchase(chargeInputNumber);
  }

  #purchase(chargeInputNumber) {
    const { quotient: newLottoCount, remainder: remainCharge } = divider(chargeInputNumber, LOTTO_PRICE);
    this.lottoCount = newLottoCount;
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
    try {
      validateShowResult(this.lottoManager.lottos);
      this.winnerNumbers = new Set();
      $$('input', $(SELECTOR.WINNER_NUMBER_SUBMIT_FORM)).forEach(winnerNumber =>
        this.winnerNumbers.add(Number(winnerNumber.value))
      );
      validateWinnerNumbers(this.winnerNumbers);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.#setLottoResultModal();
  }

  #setLottoResultModal() {
    this.lottoMachineView.showLottoResultModal();
    this.#setLottoResultEvent();
    this.#showLottoResult();
  }

  #showLottoResult() {
    const lottoResult = this.lottoManager.checkWinnerLotto(
      [...this.winnerNumbers].slice(0, LOTTO_NUMBER.LENGTH),
      this.winnerNumbers[LOTTO_NUMBER.LENGTH]
    );
    const rateOfReturn = this.#calculateLottoPrize(lottoResult);
    this.lottoMachineView.showLottoResultTable(lottoResult, rateOfReturn);
  }

  #setLottoResultEvent() {
    $(SELECTOR.LOTTO_RESTART_BUTTON).addEventListener('click', this.#restartLotto.bind(this));
    $(SELECTOR.CLOSE_RESULT_MODAL).addEventListener('click', this.#onStatisticsModalClose.bind(this));
    window.addEventListener('click', this.#closeModalIfClickOutOfModalBind);
    window.addEventListener('keyup', this.#closeModalwithESCBind);
  }

  #onStatisticsModalClose(event) {
    event.preventDefault();
    this.#removeModalAndEvent();
  }

  #closeModalIfClickOutOfModal(event) {
    event.preventDefault();
    if (event.target.id === ID.LOTTO_RESULT_MODAL) {
      this.#removeModalAndEvent();
    }
  }

  #closeModalwithESC(event) {
    event.preventDefault();
    if (event.key === 'Escape') {
      this.#removeModalAndEvent();
    }
  }

  #removeModalAndEvent() {
    this.lottoMachineView.removeLottoResultModal();
    window.removeEventListener('click', this.#closeModalIfClickOutOfModalBind);
    window.removeEventListener('keyup', this.#closeModalwithESCBind);
  }

  #calculateLottoPrize(lottoResult) {
    const totalPrize = lottoResult.reduce((acc, cur, idx) => acc + LOTTO_PRIZE[idx] * cur);
    const totalCost = this.lottoCount * LOTTO_PRICE;
    const rateOfReturn = parseFloat(((totalPrize / totalCost) * 100 - 100).toFixed(2));
    return rateOfReturn;
  }

  #restartLotto(event) {
    event.preventDefault();
    this.#removeModalAndEvent();
    this.lottoManager = new LottoManager();
    this.lottoMachineView.setInputDisabled(false);
    this.lottoMachineView.updateLottoList(this.lottoManager.lottos);
    this.lottoMachineView.resetInputs();
  }

  #makeAutoFocus() {
    const inputArray = $$('input', $(SELECTOR.WINNER_NUMBER_SUBMIT_FORM));
    inputArray.forEach((inputNode, index) => {
      inputNode.addEventListener('keyup', () => this.#checkWinnerNumberInputLength(inputArray, inputNode, index));
    });
  }

  #checkWinnerNumberInputLength(inputArray, inputNode, index) {
    if ((index !== LOTTO_NUMBER.LENGTH && inputNode.value.length) === LOTTO_NUMBER.MAX_NUMBER_LENGTH) {
      inputArray[index + 1].focus();
    }
    if (inputNode.value.length > LOTTO_NUMBER.MAX_NUMBER_LENGTH) {
      inputNode.value = inputNode.value.substr(0, LOTTO_NUMBER.MAX_NUMBER_LENGTH);
    }
  }
}
