import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import RetryFunc from "../utils/RetryFunc.js";
import bonusNumberValidator from "../validator/BonusNumberValidator.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import WebView from "../view/webView.js";

const resultButton = document.getElementById("result_button");
const dialog = document.getElementById("result_dialog");
const retryButton = document.getElementById("retry_button");

const purchaseAmountInput = document.getElementById("input_purchaseAmount");
const purchaseButton = document.getElementById("purchase_button");
const purchaseNumber = document.getElementById("purchase_number");
const successPurchases = document.getElementsByClassName("after_purchase");
const isRetry = document.getElementById("invalid_purchaseAmount");

const invalid = document.getElementById("invalid_winningLotto");

const winningNumbers = document.querySelectorAll(".input_winningNumber");
const bonusNumber = document.getElementById("input_bonusNumber");

class WebController {
  #reset() {
    location.reload();
  }

  async start() {
    purchaseAmountInput.focus();

    await this.play();
    retryButton.addEventListener("click", async () => {
      dialog.close(); // 모달 닫기
      this.#reset();
    });
  }

  async play() {
    const lottoList = await this.#setLotto();
    const winningLotto = await this.#setWinningLotto();
    this.#getGameResult(lottoList, winningLotto);
  }

  async #setLotto() {
    const purchaseAmount = await RetryFunc.executeOrRetryAsync(
      this.#getPurchaseAmount.bind(this),
    );
    const lottoMachine = new LottoMachine(purchaseAmount);
    const lottoList = lottoMachine.makeLottos();
    this.#displayLottoList(lottoList);

    return lottoList;
  }

  async #getPurchaseAmount() {
    return new Promise((resolve) => {
      function onClickHandler(event) {
        event.preventDefault();
        try {
          purchaseAmountValidator(purchaseAmountInput.value);
          resolve(Number(purchaseAmountInput.value));

          // eslint-disable-next-line max-depth
          // TODO: dept 리팩토링 필요
          for (const successPurchase of successPurchases) {
            successPurchase.style.visibility = "visible";
          }

          purchaseNumber.textContent = `총 ${purchaseAmountInput.value / 1000}개를 구매하였습니다.`;
          purchaseAmountInput.value = "";
          isRetry.innerText = "";
          purchaseButton.removeEventListener("click", onClickHandler);
        } catch (error) {
          isRetry.innerText = error.message;
          //   purchaseAmountInput.value = "";
        }
      }

      purchaseButton.addEventListener("click", onClickHandler);
    });
  }

  #displayLottoList(lottoList) {
    const lottoNumberList = lottoList.reduce((acc, cur) => {
      const numbers = cur.getNumbers();
      return [...acc, numbers];
    }, []);
    WebView.showLottoList(lottoNumberList);
  }

  async #setWinningLotto() {
    const winningLotto = await this.#getWinningLotto();

    return winningLotto;
  }

  #getWinningLotto() {
    return new Promise((resolve) => {
      function onInputKeyDown(event) {
        if (event.key === "Enter") {
          const nextInput = event.target.nextElementSibling;
          // eslint-disable-next-line max-depth
          if (nextInput) {
            nextInput.focus();
          } else {
            bonusNumber.focus();
          }
        }
      }

      function onClickHandler(event) {
        event.preventDefault();
        const numbersString = Array.prototype.map
          .call(winningNumbers, (input) => input.value.trim())
          .join(",");
        console.log("numbersString", numbersString);

        try {
          const winningLotto = new LottoMachine().makeWinningLotto(
            numbersString,
          );
          bonusNumberValidator(
            winningLotto.getNumbers(),
            Number(bonusNumber.value),
          );
          resolve(WinningLotto(winningLotto, bonusNumber.value));

          invalid.innerText = "";

          //   resultButton.removeEventListener("click", onClickHandler);
          dialog.showModal();
        } catch (error) {
          invalid.innerText = error.message;
        }
      }

      function onBonusNumberInputKeyDown(event) {
        if (event.key === "Enter") {
          // Call the onClickHandler directly instead of triggering the click event
          onClickHandler(event);
        }
      }

      winningNumbers.forEach((input) => {
        input.addEventListener("keydown", onInputKeyDown);
      });
      bonusNumber.addEventListener("keydown", onBonusNumberInputKeyDown);

      resultButton.addEventListener("click", onClickHandler);
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
