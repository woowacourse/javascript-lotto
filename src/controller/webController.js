// import { RETRY_INPUT } from "../constants/system.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import RetryFunc from "../utils/RetryFunc.js";
import bonusNumberValidator from "../validator/BonusNumberValidator.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import OutputView from "../view/OutputView.js";
import WebView from "../view/webView.js";
// import InputView from "../view/InputView.js";
// import OutputView from "../view/OutputView.js";

class WebController {
  //   #inputView;
  #outputView;

  constructor() {
    // this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async start() {
    console.log("start");
    await this.play();
    // const restart = await this.#inputView.inputRestartGame();
    // if (restart.toLowerCase() === RETRY_INPUT) this.start();
  }

  async play() {
    try {
      const lottoList = await this.#setLotto();
      const winningLotto = await this.#setWinningLotto();
      console.log("win,", winningLotto);
      this.#getGameResult(lottoList, winningLotto);
    } catch (exceedMaxRetryError) {
      //   this.#outputView.printExceedMaxRetry(exceedMaxRetryError.message);
    }
  }

  async #setLotto() {
    const purchaseAmount = await RetryFunc.executeUntillMaxTry(
      this.#getPurchaseAmount.bind(this),
    );
    const lottoMachine = new LottoMachine(purchaseAmount);
    const lottoList = lottoMachine.makeLottos();
    this.#displayLottoList(lottoList);

    return lottoList;
  }

  async #getPurchaseAmount() {
    return new Promise((resolve) => {
      const purchaseAmountInput = document.getElementById(
        "input_purchaseAmount",
      );
      const button = document.getElementById("purchase_button");

      function onClickHandler(event) {
        event.preventDefault();
        purchaseAmountValidator(purchaseAmountInput.value);
        resolve(Number(purchaseAmountInput.value));
        purchaseAmountInput.value = "";

        // 이벤트 핸들러를 한 번만 실행하도록 리스너 제거
        button.removeEventListener("click", onClickHandler);
      }

      button.addEventListener("click", onClickHandler);
    });
  }

  #displayLottoList(lottoList) {
    const lottoNumberList = lottoList.reduce((acc, cur) => {
      const numbers = cur.getNumbers();
      return [...acc, numbers];
    }, []);
    WebView.showLottoList(lottoNumberList);
    this.#outputView.printLottos(lottoNumberList);
  }

  async #setWinningLotto() {
    const winningLotto = await this.#getWinningLotto();

    return winningLotto;
  }

  #getWinningLotto() {
    return new Promise((resolve) => {
      const button = document.getElementById("result_button");
      const winningNumbers = document.querySelectorAll(".input_winningNumber");
      const bonusNumber = document.getElementById("input_bonusNumber");
      console.log("getWinningLotto");

      function onInputKeyDown(event) {
        if (event.key === "Enter") {
          // 엔터 키를 눌렀을 때 다음 입력란으로 포커스 이동
          const nextInput = event.target.nextElementSibling;
          if (nextInput) {
            nextInput.focus();
          } else {
            bonusNumber.focus();
          }
        }
      }

      function onBonusNumberInputKeyDown(event) {
        if (event.key === "Enter") {
          button.click();
        }
      }

      function onClickHandler(event) {
        event.preventDefault();
        const numbersString = Array.prototype.map
          .call(winningNumbers, (input) => input.value.trim())
          .join(",");

        const winningLotto = new LottoMachine().makeWinningLotto(numbersString);
        bonusNumberValidator(
          winningLotto.getNumbers(),
          Number(bonusNumber.value),
        );

        resolve(WinningLotto(winningLotto, bonusNumber.value));
        winningNumbers.forEach((input) => {
          input.value = "";
        });
        bonusNumber.value = "";

        // 이벤트 핸들러를 한 번만 실행하도록 리스너 제거
        button.removeEventListener("click", onClickHandler);
      }

      winningNumbers.forEach((input) => {
        input.addEventListener("keydown", onInputKeyDown);
      });

      bonusNumber.addEventListener("keydown", onBonusNumberInputKeyDown);

      button.addEventListener("click", onClickHandler);
    });
  }

  #getGameResult(lottoList, winningLotto) {
    const result = new LottoResult(lottoList, winningLotto);
    const { rank, profit } = result.getResult();

    this.#outputView.printResult(rank);
    this.#outputView.printProfit(profit);
  }
}

export default WebController;
