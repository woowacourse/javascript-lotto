import LottoStore from "../../step1/domains/LottoStore.js";
import { addEvent } from "../utils/addEvent.js";
import { getLottoRules } from "../utils/getLottoRules.js";
import { readInput } from "../view/Inputview.js";
import {
  printLottos,
  removeLottos,
  printErrorMessage,
  removeErrorMessage,
} from "../view/Outputview.js";
import WinningLottoForm from "./WinningLottoForm.js";

class LottoStoreBox {
  static #lottoStore = new LottoStore(getLottoRules());
  static #lottos = [];
  static #$amountForm = document.getElementById("amountForm");

  static init() {
    this.#initLottos();
    const $amountInput = this.#$amountForm.getElementsByTagName("input")[0];
    $amountInput.value = "";
    $amountInput.focus();
    WinningLottoForm.hide();
  }

  static #initLottos() {
    removeLottos();
  }

  static #getAmounts(e) {
    e.preventDefault();
    const amount = readInput(e.target);

    try {
      this.#lottos = this.#lottoStore.publishLottos(amount[0]);
      printLottos(this.#lottos);

      this.#handleErrorMessage({ type: "init", error: null });
    } catch (error) {
      this.#initLottos();
      WinningLottoForm.hide();
      this.#handleErrorMessage({ type: "error", error });
    }
  }

  static #handleErrorMessage({ type, error }) {
    if (type === "init") {
      removeErrorMessage({
        location: this.#$amountForm.getElementsByClassName("errorMessage")[0],
      });
    }
    if (type === "error") {
      printErrorMessage({
        location: this.#$amountForm.getElementsByClassName("errorMessage")[0],
        errorMessage: error.message,
      });
    }
  }

  static addSubmitEvent() {
    addEvent({
      target: this.#$amountForm,
      eventType: "submit",
      callback: this.#getAmounts.bind(this),
    });
  }

  static getLottos() {
    return [...this.#lottos];
  }
}

export default LottoStoreBox;
