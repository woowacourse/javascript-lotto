import LottoMachine from "../domains/LottoMachine.js";
import $ from "./utils.js";
import {
  ticketImg,
  lottoNumberTemplate,
  purchaseMessageTemplate,
} from "./template.js";
import { DOM } from "../constants/constants.js";

export default class LottoView {
  constructor() {
    this.machine = new LottoMachine();
  }

  bindEvents() {
    $(DOM.ID.PURCHASE_MONEY_FORM).addEventListener(
      "submit",
      this.handlePurchaseForm.bind(this)
    );
    $(DOM.ID.LOTTO_RESULT_TOGGLE).addEventListener(
      "click",
      this.handleResultToggle.bind(this)
    );
  }

  handlePurchaseForm(event) {
    event.preventDefault();
    try {
      this.userInputMoney();
      this.machine.operateLottoMachine();
      this.renderLottoAmount();
      this.renderLotto();
      this.disablePurchase();
      this.showLottoContainers();
    } catch (e) {
      alert(e.message);
    }
  }

  handleResultToggle() {
    this.renderLotto();
  }

  userInputMoney() {
    this.machine.inputMoney = Number($(DOM.ID.PURCHASE_MONEY_INPUT).value);
  }

  renderLotto() {
    $(DOM.ID.LOTTO_RESULT_CONTAINER).replaceChildren();
    $(DOM.ID.TOGGLE_CHECKBOX).checked
      ? this.renderLottoNumbers()
      : this.renderLottoImgs();
  }

  renderLottoImgs() {
    this.machine.lottos.map(() => {
      $(DOM.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        "beforeEnd",
        ticketImg
      );
    });
  }

  renderLottoNumbers() {
    this.machine.lottos.map((lotto) => {
      $(DOM.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        "beforeEnd",
        lottoNumberTemplate(lotto.numbers.join(", "))
      );
    });
  }

  renderLottoAmount() {
    $(DOM.ID.LOTTO_RESULT_SPAN).textContent = purchaseMessageTemplate(
      this.machine.lottos
    );
  }

  disablePurchase() {
    $(DOM.ID.PURCHASE_MONEY_INPUT).disabled = true;
    $(DOM.ID.PURCHASE_MONEY_BUTTON).disabled = true;
  }

  showLottoContainers() {
    $(DOM.ID.LOTTO_RESULT_SECTION).hidden = false;
    $(DOM.ID.WINNING_NUMBER_FORM).hidden = false;
  }
}
