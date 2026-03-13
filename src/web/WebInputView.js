import { Validator } from "../utils/Validator.js";
import {
  showLottoSection,
  showWinningSection,
  disablePurchaseForm,
  disableWinningForm,
  resetPurchaseForm,
  resetWinningForm,
  showModalOverlay,
} from "./DOMController.js";

class WebInputView {
  static #tempBonusNumber = null;

  static async readIsRetry() {
    return new Promise((resolve) => {
      const retryButton = document.querySelector("button.modal-retry-button");
      const closeButton = document.querySelector("button.modal-close-button");
      const handler = this.#handleRetry(resolve);
      retryButton.addEventListener("click", handler, { once: true });
      closeButton.addEventListener("click", handler, { once: true });
    });
  }

  static async readPurchaseAmount() {
    return new Promise((resolve) => {
      const purchaseForm = document.querySelector("form.purchase-form");
      purchaseForm.addEventListener(
        "submit",
        this.#handlePurchaseSubmit(resolve),
        { once: true },
      );
    });
  }

  static async readWinningNumbers() {
    return new Promise((resolve) => {
      const winningForm = document.querySelector("form.winning-form");
      winningForm.addEventListener(
        "submit",
        this.#handleWinningSubmit(resolve),
        { once: true },
      );
    });
  }

  static async readBonusNumber() {
    return this.#tempBonusNumber;
  }

  static #handleRetry(resolve) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.#resetAll();
      resolve(true);
    };
  }

  static #handlePurchaseSubmit(resolve) {
    return (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const purchaseAmount = this.#readNumber(formData.get("purchase-amount"));
      resolve(purchaseAmount);
    };
  }

  static #handleWinningSubmit(resolve) {
    return (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const winningLottoData = formData.getAll("winning-lotto");
      const bonusNumberData = formData.get("bonus-number");

      const winningLotto = this.#readNumberList(winningLottoData);
      const bonusNumber = this.#readNumber(bonusNumberData);

      this.#tempBonusNumber = bonusNumber;
      resolve(winningLotto);
    };
  }

  static #readNumber(input) {
    Validator.isNumber(Number(input));
    return Number(input);
  }

  static #readNumberList(input) {
    const parsedInputList = input.map((v) => Number(v.trim()));
    parsedInputList.map(Validator.isNumber);
    return parsedInputList;
  }

  static #resetAll() {
    showLottoSection(false);
    showWinningSection(false);
    disablePurchaseForm(false);
    disableWinningForm(false);
    resetPurchaseForm();
    resetWinningForm();
    showModalOverlay(false);
  }
}

export default WebInputView;
