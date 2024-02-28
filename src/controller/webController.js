import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import purchaseClickHandler from "../Handler/purchaseClickHandler.js";
import winningLottoHandler from "../Handler/winningLottoHandler.js";
import WebView from "../view/webView.js";

const purchaseAmountInput = document.getElementById("input_purchaseAmount");
const purchaseButton = document.getElementById("purchase_button");

const resultButton = document.getElementById("result_button");
const dialog = document.getElementById("result_dialog");
const retryButton = document.getElementById("retry_button");

const winningNumbers = document.querySelectorAll(".input_winningNumber");

class WebController {
  #reset() {
    window.location.reload();
  }

  async start() {
    purchaseAmountInput.focus();

    await this.play();
    retryButton.addEventListener("click", async () => {
      dialog.close();
      this.#reset();
    });
  }

  async play() {
    const lottoList = await this.#setLotto();
    const winningLotto = await this.#setWinningLotto();
    this.#getGameResult(lottoList, winningLotto);
  }

  async #setLotto() {
    const purchaseAmount = await this.#getPurchaseAmount();
    const lottoMachine = new LottoMachine(purchaseAmount);
    const lottoList = lottoMachine.makeLottos();

    this.#displayLottoList(lottoList);

    return lottoList;
  }

  async #getPurchaseAmount() {
    return new Promise((resolve) => {
      purchaseButton.addEventListener("click", (event) => {
        purchaseClickHandler(event, resolve);
      });
    });
  }

  #displayLottoList(lottoList) {
    const lottoNumberList = lottoList.reduce((acc, cur) => {
      const numbers = cur.getNumbers();
      return [...acc, numbers];
    }, []);

    WebView.showAfterPurchases();
    WebView.showPurchaseAmount(purchaseAmountInput.value);
    WebView.showLottoList(lottoNumberList);
  }

  async #setWinningLotto() {
    winningNumbers.forEach((input) => {
      input.addEventListener("keydown", winningLottoHandler.onInputKeyDown);
    });

    const winningLotto = await this.#getWinningLotto();

    return winningLotto;
  }

  #getWinningLotto() {
    return new Promise((resolve) => {
      resultButton.addEventListener("click", (event) => {
        winningLottoHandler.onClickHandler(event, resolve);
      });
    });
  }

  #getGameResult(lottoList, winningLotto) {
    const result = new LottoResult(lottoList, winningLotto);
    const { rank, profit } = result.getResult();

    WebView.showGameResult(rank);
    WebView.showProfit(profit);
  }
}

export default WebController;
