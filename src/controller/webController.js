import LottoMachine from "../domain/LottoMachine.js";
import retryHandler from "../Handler/retryHandler.js";
import winningLottoHandler from "../Handler/winningLottoHandler.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import WebView from "../view/webView.js";

const purchaseAmountInput = document.getElementById("input_purchaseAmount");
const purchaseButton = document.getElementById("purchase_button");

const winningNumbers = document.querySelectorAll(".input_winningNumber");
const resultButton = document.getElementById("result_button");

const dialog = document.getElementById("result_dialog");
const closeDialogButton = document.getElementById("close_dialog");

const retryButton = document.getElementById("retry_button");
const invalidPurchaseAmount = document.getElementById("invalid_purchaseAmount");

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
