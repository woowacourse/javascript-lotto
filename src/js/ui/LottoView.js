<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import LottoMachine from "../domains/LottoMachine.js";
import $ from "./utils.js";
=======
import LottoMachine from '../domains/LottoMachine.js';
import $ from './utils.js';
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
=======
import LottoMachine from "../domains/LottoMachine.js";
import $ from "./utils.js";
>>>>>>> 7cf755a (refactor: constant SELECTOR -> DOM)
import {
  ticketImg,
  lottoNumberTemplate,
  purchaseMessageTemplate,
<<<<<<< HEAD
<<<<<<< HEAD
} from "./template.js";
import { DOM } from "../constants/constants.js";
=======
} from './template.js';
<<<<<<< HEAD
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
=======
import { SELECTOR } from '../constants/constants.js';
>>>>>>> 978f6e4 (refactor: LottoView 셀럭터 상수 분리)
=======
} from "./template.js";
import { DOM } from "../constants/constants.js";
>>>>>>> 7cf755a (refactor: constant SELECTOR -> DOM)
=======
import LottoMachine from '../domains/LottoMachine.js';
import $ from './utils.js';
import {
  ticketImg,
  lottoNumberTemplate,
  purchaseMessageTemplate
} from './template.js';
import { DOM } from '../constants/constants.js';
<<<<<<< HEAD
>>>>>>> a74326a (refator: LottoView 두번이상 DomSelecting하는 요소들 필드화)
=======
import { validateArrayNumber } from '../validations/utils.js';
<<<<<<< HEAD
>>>>>>> e3a0510 (feat: 로또 당첨 숫자 validate로직 추가)
=======
import { LottoModal } from './LottoModal.js';
>>>>>>> ed12848 (refactor: Lottoview LottoModal 분리)

export default class LottoView {
  constructor() {
    this.machine = new LottoMachine();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
    this.$lottoResultContainer = $(DOM.ID.LOTTO_RESULT_CONTAINER);
>>>>>>> a74326a (refator: LottoView 두번이상 DomSelecting하는 요소들 필드화)
    this.bindEvents();
<<<<<<< HEAD
>>>>>>> be29b46 (refactor: LottoView BindEvents() constructor내에 추가)
=======
    this.lottoModal = new LottoModal(this, this.machine);
>>>>>>> ed12848 (refactor: Lottoview LottoModal 분리)
=======
    this.lottoModal = new LottoModal(this);
    this.$lottoResultContainer = $(DOM.ID.LOTTO_RESULT_CONTAINER);
    this.$winningNumberInputArr = document.querySelectorAll(
      '.winning-number-input'
    );
    this.$purchaseMoneyInput = $(DOM.ID.PURCHASE_MONEY_INPUT);
    this.$purchaseMoneyButton = $(DOM.ID.PURCHASE_MONEY_BUTTON);
    this.bindEvents();
>>>>>>> f663b5d (refactor: LottoView 2번 이상 사용하는 element 상수화)
  }

  bindEvents() {
    $(DOM.ID.PURCHASE_MONEY_FORM).addEventListener(
      'submit',
      this.handlePurchaseForm.bind(this)
    );
<<<<<<< HEAD
    $(SELECTOR.ID.LOTTO_RESULT_TOGGLE).addEventListener(
      'click',
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
=======
    $(DOM.ID.LOTTO_RESULT_TOGGLE).addEventListener(
<<<<<<< HEAD
      "click",
>>>>>>> 7cf755a (refactor: constant SELECTOR -> DOM)
=======
      'click',
>>>>>>> a74326a (refator: LottoView 두번이상 DomSelecting하는 요소들 필드화)
      this.handleResultToggle.bind(this)
    );
  }

  handlePurchaseForm(event) {
    event.preventDefault();
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      this.insertMoney();
=======
      this.userInputMoney();
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
=======
      this.insertMoney();
>>>>>>> 7fc9169 (refactor: LottoView 메소드 이름 변경)
      this.machine.operateLottoMachine();
      this.renderLottoAmount();
      this.renderLotto();
      this.disablePurchase();
<<<<<<< HEAD
<<<<<<< HEAD
      this.showLottoContainers();
=======
      this.controlLottoContainers();
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
=======
      this.showLottoContainers();
<<<<<<< HEAD
>>>>>>> ccddd2a (refactor: 메서드명 변경)
=======
      this.focusWinningNumberForm();
      this.bindEventsToResultForm();
>>>>>>> 2e79a4a (feat: LottoView 금액 제출 후 당첨번호 input 자동 focus)
    } catch (e) {
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.renderLotto();
  }

<<<<<<< HEAD
<<<<<<< HEAD
  insertMoney() {
    this.machine.inputMoney = Number($(DOM.ID.PURCHASE_MONEY_INPUT).value);
  }

  renderLotto() {
    $(DOM.ID.LOTTO_RESULT_CONTAINER).replaceChildren();
    $(DOM.ID.TOGGLE_CHECKBOX).checked
=======
  userInputMoney() {
=======
  insertMoney() {
>>>>>>> 7fc9169 (refactor: LottoView 메소드 이름 변경)
    this.machine.inputMoney = Number($(DOM.ID.PURCHASE_MONEY_INPUT).value);
  }

  renderLotto() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    $('lotto-result-container').replaceChildren();
    $('lotto-result-toggle-checkbox').checked
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
=======
    $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).replaceChildren();
    $(SELECTOR.ID.TOGGLE_CHECKBOX).checked
>>>>>>> 978f6e4 (refactor: LottoView 셀럭터 상수 분리)
=======
    $(DOM.ID.LOTTO_RESULT_CONTAINER).replaceChildren();
=======
    this.$lottoResultContainer.replaceChildren();
>>>>>>> a74326a (refator: LottoView 두번이상 DomSelecting하는 요소들 필드화)
    $(DOM.ID.TOGGLE_CHECKBOX).checked
>>>>>>> 7cf755a (refactor: constant SELECTOR -> DOM)
      ? this.renderLottoNumbers()
      : this.renderLottoImgs();
  }

  renderLottoImgs() {
    this.machine.lottos.map(() => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      $(DOM.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        "beforeEnd",
        ticketImg
      );
=======
      $('lotto-result-container').insertAdjacentHTML('beforeEnd', ticketImg);
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
=======
      $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        'beforeEnd',
=======
      $(DOM.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        "beforeEnd",
>>>>>>> 7cf755a (refactor: constant SELECTOR -> DOM)
        ticketImg
      );
>>>>>>> 978f6e4 (refactor: LottoView 셀럭터 상수 분리)
=======
      this.$lottoResultContainer.insertAdjacentHTML('beforeEnd', ticketImg);
>>>>>>> a74326a (refator: LottoView 두번이상 DomSelecting하는 요소들 필드화)
    });
  }

  renderLottoNumbers() {
    this.machine.lottos.map((lotto) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      $(DOM.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        "beforeEnd",
        lottoNumberTemplate(lotto.numbers.join(", "))
=======
      $('lotto-result-container').insertAdjacentHTML(
=======
      $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
>>>>>>> 978f6e4 (refactor: LottoView 셀럭터 상수 분리)
        'beforeEnd',
        lottoNumberTemplate(lotto.numbers.join(', '))
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
=======
      $(DOM.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        "beforeEnd",
        lottoNumberTemplate(lotto.numbers.join(", "))
>>>>>>> 7cf755a (refactor: constant SELECTOR -> DOM)
=======
      this.$lottoResultContainer.insertAdjacentHTML(
        'beforeEnd',
        lottoNumberTemplate(lotto.numbers.join(', '))
>>>>>>> a74326a (refator: LottoView 두번이상 DomSelecting하는 요소들 필드화)
      );
    });
  }

  renderLottoAmount() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    $(DOM.ID.LOTTO_RESULT_SPAN).textContent = purchaseMessageTemplate(
=======
    $('lotto-result-span').textContent = purchaseMessageTemplate(
>>>>>>> 96fc414 (refactor: 함수 분리, 함수명 변경)
=======
    $(SELECTOR.ID.LOTTO_RESULT_SPAN).textContent = purchaseMessageTemplate(
>>>>>>> 978f6e4 (refactor: LottoView 셀럭터 상수 분리)
=======
    $(DOM.ID.LOTTO_RESULT_SPAN).textContent = purchaseMessageTemplate(
>>>>>>> 7cf755a (refactor: constant SELECTOR -> DOM)
      this.machine.lottos
    );
  }

  disablePurchase() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    $(SELECTOR.ID.PURCHASE_MONEY_INPUT).disabled = true;
    $(SELECTOR.ID.PURCHASE_MONEY_BUTTON).disabled = true;
=======
    $(DOM.ID.PURCHASE_MONEY_INPUT).disabled = true;
    $(DOM.ID.PURCHASE_MONEY_BUTTON).disabled = true;
>>>>>>> 7cf755a (refactor: constant SELECTOR -> DOM)
=======
    this.$purchaseMoneyInput.disabled = true;
    this.$purchaseMoneyButton.disabled = true;
>>>>>>> f663b5d (refactor: LottoView 2번 이상 사용하는 element 상수화)
  }

<<<<<<< HEAD
  controlLottoContainers() {
    $(SELECTOR.ID.LOTTO_RESULT_SECTION).hidden = !$(
      SELECTOR.ID.LOTTO_RESULT_SECTION
    ).hidden;
    $(SELECTOR.ID.WINNING_NUMBER_FORM).hidden = !$(
      SELECTOR.ID.WINNING_NUMBER_FORM
    ).hidden;
>>>>>>> 978f6e4 (refactor: LottoView 셀럭터 상수 분리)
=======
  showLottoContainers() {
<<<<<<< HEAD
    $(SELECTOR.ID.LOTTO_RESULT_SECTION).hidden = false;
    $(SELECTOR.ID.WINNING_NUMBER_FORM).hidden = false;
>>>>>>> ccddd2a (refactor: 메서드명 변경)
=======
    $(DOM.ID.LOTTO_RESULT_SECTION).hidden = false;
    $(DOM.ID.WINNING_NUMBER_FORM).hidden = false;
>>>>>>> 7cf755a (refactor: constant SELECTOR -> DOM)
  }

  hideLottoContainers() {
    $(DOM.ID.LOTTO_RESULT_SECTION).hidden = true;
    $(DOM.ID.WINNING_NUMBER_FORM).hidden = true;
  }

  focusWinningNumberForm() {
    this.$winningNumberInputArr[0].focus();
  }

  bindEventsToResultForm() {
    $('winning-number-form').addEventListener(
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
  }

  reactivatePurchaseForm() {
    this.$winningNumberInputArr.forEach((element) => (element.value = ''));
    this.$purchaseMoneyInput.value = '';
    this.$purchaseMoneyInput.disabled = false;
    this.$purchaseMoneyButton.disabled = false;
    $(DOM.ID.TOGGLE_CHECKBOX).checked = false;
  }
}
