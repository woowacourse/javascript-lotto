import LottoMachine from "../domain/LottoMachine.js";
import retryHandler from "../Handler/retryHandler.js";
import winningLottoHandler from "../Handler/winningLottoHandler.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import WebView from "../view/webView.js";

const purchaseAmountInput = document.getElementsByClassName(
  "purchase-section__input",
)[0];
const purchaseButton = document.getElementsByClassName(
  "purchase-section__button",
)[0];

const winningNumbers = document.querySelectorAll(
  ".winning-lotto__input-number",
);
const resultButton = document.getElementsByClassName(
  "winning-lotto__result-button",
)[0];

const dialog = document.querySelector(".result-dialog");
const closeDialogButton = document.getElementsByClassName(
  "result-dialog__close-button",
)[0];

const retryButton = document.getElementsByClassName(
  "result-dialog__retry-button",
)[0];
const invalidPurchaseAmount = document.getElementsByClassName(
  "purchase-section__invalid",
)[0];

class WebController {
  #lottoList = [];

  start() {
    purchaseAmountInput.focus();

    this.#addPurchaseClickHandler();
    this.#addWinningLottoHandler();
    retryButton.addEventListener("click", async () => {
      retryHandler();
    });
  }

  #addPurchaseClickHandler() {
    purchaseButton.addEventListener("click", (event) => {
      this.purchaseClickHandler(event);
    });
  }

  purchaseClickHandler(event) {
    event.preventDefault();
    try {
      purchaseAmountValidator(purchaseAmountInput.value);
      this.#setLotto();
      purchaseButton.removeEventListener("click", this.purchaseClickHandler);
    } catch (error) {
      invalidPurchaseAmount.textContent = error.message;
    }
  }

  #setLotto() {
    const lottoMachine = new LottoMachine(purchaseAmountInput.value);
    this.#lottoList = lottoMachine.makeLottos();
    this.#displayLottoList();
  }

  #displayLottoList() {
    const lottoNumberList = this.#lottoList.reduce((acc, cur) => {
      const numbers = cur.getNumbers();
      return [...acc, numbers];
    }, []);

    WebView.showAfterPurchases();
    WebView.showPurchaseAmount(purchaseAmountInput.value);
    WebView.showLottoList(lottoNumberList);
  }

  #addWinningLottoHandler() {
    winningNumbers.forEach((input) => {
      input.addEventListener("keydown", winningLottoHandler.onInputKeyDown);
    });
    resultButton.addEventListener("click", (event) => {
      winningLottoHandler.onClickGameResult(event, this.#lottoList);
    });
    this.#dialogHandler();
  }

  #dialogHandler() {
    closeDialogButton.addEventListener("click", () => {
      dialog.close();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }
}

export default WebController;
