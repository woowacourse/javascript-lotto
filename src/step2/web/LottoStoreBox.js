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
    //TODO
    // 다시 시작하기 누를 경우, 아래 콘솔이 여러번 찍힌다.
    // console.log("????", this.#lottos);
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
      removeErrorMessage({
        location: this.#$amountForm.getElementsByClassName("errorMessage")[0],
      });
    } catch (error) {
      printErrorMessage({
        location: this.#$amountForm.getElementsByClassName("errorMessage")[0],
        errorMessage: error.message,
      });
      this.#initLottos();
      WinningLottoForm.hide();
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
