import LottoMachine from '../domains/LottoMachine.js';
import $ from './utils.js';
import {
  ticketImg,
  lottoNumberTemplate,
  purchaseMessageTemplate
} from './template.js';
import { DOM } from '../constants/constants.js';
import { validateArrayNumber } from '../validations/utils.js';
import { LottoModal } from './LottoModal.js';

export default class LottoView {
  constructor() {
    this.machine = new LottoMachine();
    this.lottoModal = new LottoModal(this);
    this.$lottoResultContainer = $(DOM.ID.LOTTO_RESULT_CONTAINER);
    this.$winningNumberInputArr = document.querySelectorAll(
      DOM.CLASS.WINNING_NUMBER_INPUT
    );
    this.$purchaseMoneyInput = $(DOM.ID.PURCHASE_MONEY_INPUT);
    this.$purchaseMoneyButton = $(DOM.ID.PURCHASE_MONEY_BUTTON);
    this.bindEvents();
  }

  bindEvents() {
    $(DOM.ID.PURCHASE_MONEY_FORM).addEventListener(
      'submit',
      this.handlePurchaseForm.bind(this)
    );
    $(DOM.ID.LOTTO_RESULT_TOGGLE).addEventListener(
      'click',
      this.handleResultToggle.bind(this)
    );
  }

  handlePurchaseForm(event) {
    event.preventDefault();
    try {
      this.insertMoney();
      this.machine.operateLottoMachine();
      this.renderLottoAmount();
      this.renderLotto();
      this.disablePurchase();
      this.showLottoContainers();
      this.focusWinningNumberForm();
      this.bindEventsToResultForm();
    } catch (e) {
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.renderLotto();
  }

  insertMoney() {
    this.machine.inputMoney = Number($(DOM.ID.PURCHASE_MONEY_INPUT).value);
  }

  renderLotto() {
    this.$lottoResultContainer.replaceChildren();
    $(DOM.ID.TOGGLE_CHECKBOX).checked
      ? this.renderLottoNumbers()
      : this.renderLottoImgs();
  }

  renderLottoImgs() {
    this.machine.lottos.map(() => {
      this.$lottoResultContainer.insertAdjacentHTML('beforeEnd', ticketImg);
    });
  }

  renderLottoNumbers() {
    this.machine.lottos.map((lotto) => {
      this.$lottoResultContainer.insertAdjacentHTML(
        'beforeEnd',
        lottoNumberTemplate(lotto.numbers.join(', '))
      );
    });
  }

  renderLottoAmount() {
    $(DOM.ID.LOTTO_RESULT_SPAN).textContent = purchaseMessageTemplate(
      this.machine.lottos
    );
  }

  disablePurchase() {
    this.$purchaseMoneyInput.disabled = true;
    this.$purchaseMoneyButton.disabled = true;
  }

  showLottoContainers() {
    $(DOM.ID.LOTTO_RESULT_SECTION).hidden = false;
    $(DOM.ID.WINNING_NUMBER_FORM).hidden = false;
  }

  hideLottoContainers() {
    $(DOM.ID.LOTTO_RESULT_SECTION).hidden = true;
    $(DOM.ID.WINNING_NUMBER_FORM).hidden = true;
  }

  focusWinningNumberForm() {
    this.$winningNumberInputArr[0].focus();
  }

  bindEventsToResultForm() {
    $(DOM.ID.WINNING_NUMBER_FORM).addEventListener(
      'submit',
      this.handleResultForm.bind(this)
    );
  }

  handleResultForm(e) {
    e.preventDefault();
    const winningNumbers = Array.from(this.$winningNumberInputArr).map(
      ({ value }) => Number.parseInt(value)
    );
    try {
      validateArrayNumber(winningNumbers);
      const bonusNumber = winningNumbers.pop();
      this.machine.calculateGrade(winningNumbers, bonusNumber);
      this.lottoModal.show(this.machine);
    } catch (e) {
      alert(e.message);
    }
  }

  restart() {
    this.hideLottoContainers();
    this.reactivatePurchaseForm();
    this.machine = new LottoMachine();
    this.$purchaseMoneyInput.focus();
  }

  reactivatePurchaseForm() {
    this.$winningNumberInputArr.forEach((element) => (element.value = ''));
    this.$purchaseMoneyInput.value = '';
    this.$purchaseMoneyInput.disabled = false;
    this.$purchaseMoneyButton.disabled = false;
    $(DOM.ID.TOGGLE_CHECKBOX).checked = false;
  }
}
