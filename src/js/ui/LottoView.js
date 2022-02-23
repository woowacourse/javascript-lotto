<<<<<<< HEAD
import LottoMachine from "../domains/LottoMachine.js";
import $ from "./utils.js";
=======
import LottoMachine from '../domains/LottoMachine.js';
import $ from './utils.js';
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
import {
  ticketImg,
  lottoNumberTemplate,
  purchaseMessageTemplate,
<<<<<<< HEAD
} from "./template.js";
import { DOM } from "../constants/constants.js";
=======
} from './template.js';
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)

export default class LottoView {
  constructor() {
    this.machine = new LottoMachine();
<<<<<<< HEAD
    this.bindEvents();
  }

  bindEvents() {
    $(DOM.ID.PURCHASE_MONEY_FORM).addEventListener(
      "submit",
      this.handlePurchaseForm.bind(this)
    );
    $(DOM.ID.LOTTO_RESULT_TOGGLE).addEventListener(
      "click",
=======
  }

  bindEvents() {
    $('purchase-money-form').addEventListener(
      'submit',
      this.handlePurchaseForm.bind(this)
    );
    $('lotto-result-toggle').addEventListener(
      'click',
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
      this.handleResultToggle.bind(this)
    );
  }

  handlePurchaseForm(event) {
    event.preventDefault();
    try {
<<<<<<< HEAD
      this.insertMoney();
=======
      this.userInputMoney();
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
      this.machine.operateLottoMachine();
      this.renderLottoAmount();
      this.renderLotto();
      this.disablePurchase();
<<<<<<< HEAD
      this.showLottoContainers();
=======
      this.controlLottoContainers();
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
    } catch (e) {
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.renderLotto();
  }

<<<<<<< HEAD
  insertMoney() {
    this.machine.inputMoney = Number($(DOM.ID.PURCHASE_MONEY_INPUT).value);
  }

  renderLotto() {
    $(DOM.ID.LOTTO_RESULT_CONTAINER).replaceChildren();
    $(DOM.ID.TOGGLE_CHECKBOX).checked
=======
  userInputMoney() {
    this.machine.inputMoney = Number($('purchase-money-input').value);
  }

  renderLotto() {
    $('lotto-result-container').replaceChildren();
    $('lotto-result-toggle-checkbox').checked
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
      ? this.renderLottoNumbers()
      : this.renderLottoImgs();
  }

  renderLottoImgs() {
    this.machine.lottos.map(() => {
<<<<<<< HEAD
      $(DOM.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        "beforeEnd",
        ticketImg
      );
=======
      $('lotto-result-container').insertAdjacentHTML('beforeEnd', ticketImg);
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
    });
  }

  renderLottoNumbers() {
    this.machine.lottos.map((lotto) => {
<<<<<<< HEAD
      $(DOM.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        "beforeEnd",
        lottoNumberTemplate(lotto.numbers.join(", "))
=======
      $('lotto-result-container').insertAdjacentHTML(
        'beforeEnd',
        lottoNumberTemplate(lotto.numbers.join(', '))
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
      );
    });
  }

  renderLottoAmount() {
<<<<<<< HEAD
    $(DOM.ID.LOTTO_RESULT_SPAN).textContent = purchaseMessageTemplate(
=======
    $('lotto-result-span').textContent = purchaseMessageTemplate(
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
      this.machine.lottos
    );
  }

  disablePurchase() {
<<<<<<< HEAD
    $(DOM.ID.PURCHASE_MONEY_INPUT).disabled = true;
    $(DOM.ID.PURCHASE_MONEY_BUTTON).disabled = true;
  }

  showLottoContainers() {
    $(DOM.ID.LOTTO_RESULT_SECTION).hidden = false;
    $(DOM.ID.WINNING_NUMBER_FORM).hidden = false;
=======
    $('purchase-money-input').disabled = true;
    $('purchase-money-button').disabled = true;
  }

  controlLottoContainers() {
    $('lotto-result-section').hidden = !$('lotto-result-section').hidden;
    $('winning-number-form').hidden = !$('winning-number-form').hidden;
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
  }
}
