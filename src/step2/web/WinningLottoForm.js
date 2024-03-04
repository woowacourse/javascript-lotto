import Lotto from "../../step1/domains/Lotto.js";
import WinningLotto from "../../step1/domains/WinningLotto.js";
import { readInput } from "../view/Inputview.js";
import { addEvent } from "../utils/addEvent.js";
import { getLottoRules } from "../utils/getLottoRules.js";
import { printErrorMessage, removeErrorMessage } from "../view/Outputview.js";
import LottoStoreBox from "./LottoStoreBox.js";
import LottoResultModal from "./LottoResultModal.js";

class WinningLottoForm {
  static #$winningLottoForm = document.getElementById("winningLottoForm");

  static #init() {
    [...this.#$winningLottoForm.getElementsByTagName("input")].forEach(
      (input) => {
        input.value = "";
      }
    );
  }

  static #getWinningLotto(e) {
    e.preventDefault();
    const rawWinningLotto = readInput(e.target);

    try {
      const winningLotto = this.#makeWinningLotto(rawWinningLotto);

      this.#handleErrorMessage({ type: "init", error: null });

      const lottos = LottoStoreBox.getLottos();
      LottoResultModal.open(lottos, winningLotto);
    } catch (error) {
      this.#handleErrorMessage({ type: "error", error });
    }
  }

  static #makeWinningLotto(rawWinningLotto) {
    return new WinningLotto(
      new Lotto(
        rawWinningLotto.slice(0, 6).map((number) => Number(number)),
        getLottoRules()
      ),
      Number(rawWinningLotto.slice(6)[0]),
      getLottoRules()
    );
  }

  static #handleErrorMessage({ type, error }) {
    if (type === "init") {
      removeErrorMessage({
        location:
          this.#$winningLottoForm.getElementsByClassName("errorMessage")[0],
      });
    }
    if (type === "error") {
      printErrorMessage({
        location:
          this.#$winningLottoForm.getElementsByClassName("errorMessage")[0],
        errorMessage: error.message,
      });
    }
  }

  static addSubmitEvent() {
    addEvent({
      target: this.#$winningLottoForm,
      eventType: "submit",
      callback: this.#getWinningLotto.bind(this),
    });
  }

  static show() {
    this.#$winningLottoForm.classList.remove("hidden");
    this.#focusFirstNumberInput();
  }

  static hide() {
    this.#$winningLottoForm.classList.add("hidden");
    this.#init();
  }

  static #focusFirstNumberInput() {
    const firstNumberInput =
      this.#$winningLottoForm.getElementsByTagName("input")[0];
    firstNumberInput.focus();
  }
}

export default WinningLottoForm;
