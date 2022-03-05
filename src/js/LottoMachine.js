import { ID, LOTTO_NUMBER, LOTTO_PRICE, LOTTO_PRIZE, SELECTOR } from './constants/constants';
import { $, $$, divider } from './utils/util';
import { validateCharge, validateWinnerNumbers } from './validation';

import LottoManager from './LottoManager';
import LottoMachineView from './views/LottoMachineView';

export default class LottoMachine {
  #closeModalIfClickOutOfModalBind;

  #closeModalwithESCBind;

  constructor() {
    this.lottoManager = new LottoManager();
    this.lottoMachineView = new LottoMachineView();
    this.#setBind();
    this.#setEvent();
  }

  #setBind() {
    this.#closeModalIfClickOutOfModalBind = this.#closeModalIfClickOutOfModal.bind(this);
    this.#closeModalwithESCBind = this.#closeModalwithESC.bind(this);
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
    this.lottoMachineView.blockInput(true);
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
    this.winnerNumbers = new Set();
    $$('input', $(SELECTOR.WINNER_NUMBER_SUBMIT_FORM)).forEach(winnerNumber =>
      this.winnerNumbers.add(Number(winnerNumber.value))
    );
    try {
      validateWinnerNumbers(this.winnerNumbers);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.#lottoResult();
  }

  #lottoResult() {
    this.lottoMachineView.showLottoResultModal();
    this.#setLottoResultEvent();
    this.#showLottoResult();
  }

  #showLottoResult() {
    const lottoResult = this.lottoManager.checkWinnerLotto(
      [...this.winnerNumbers].slice(0, LOTTO_NUMBER.LENGTH),
      this.winnerNumbers[LOTTO_NUMBER.LENGTH]
    );
    const rateOfReturn = this.#calculateLottoReturn(lottoResult);
    this.lottoMachineView.showLottoResultTable(lottoResult, rateOfReturn);
  }

  #setLottoResultEvent() {
    $(SELECTOR.LOTTO_RESTART_BUTTON).addEventListener('click', this.#restartLotto.bind(this));
    $(SELECTOR.CLOSE_RESULT_MODAL).addEventListener('click', this.#clickXButton.bind(this));
    window.addEventListener('click', this.#closeModalIfClickOutOfModalBind);
    window.addEventListener('keyup', this.#closeModalwithESCBind);
  }

  #clickXButton(event) {
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

  #calculateLottoReturn(lottoResult) {
    let totalPrize = 0;
    lottoResult.forEach((count, index) => {
      totalPrize += LOTTO_PRIZE[index] * count;
    });
    const totalCost = this.lottoCount * LOTTO_PRICE;
    const rateOfReturn = parseFloat(((totalPrize / totalCost) * 100 - 100).toFixed(2));
    return rateOfReturn;
  }

  #restartLotto(event) {
    event.preventDefault();
    this.#removeModalAndEvent();
    this.lottoManager = new LottoManager();
    this.lottoMachineView.blockInput(false);
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
