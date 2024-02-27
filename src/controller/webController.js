// import { RETRY_INPUT } from "../constants/system.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import RetryFunc from "../utils/RetryFunc.js";
import bonusNumberValidator from "../validator/BonusNumberValidator.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import OutputView from "../view/OutputView.js";
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
      document.addEventListener("DOMContentLoaded", function () {
        const purchaseAmountInput = document.getElementById(
          "input_purchaseAmount",
        );
        const button = document.getElementById("purchase_button");

        button.addEventListener("click", function (event) {
          event.preventDefault();
          purchaseAmountValidator(purchaseAmountInput.value);
          resolve(Number(purchaseAmountInput.value));
          purchaseAmountInput.value = "";
        });
      });
    });
  }

  #displayLottoList(lottoList) {
    const lottoNumberList = lottoList.reduce((acc, cur) => {
      const numbers = cur.getNumbers();
      return [...acc, numbers];
    }, []);

    // return lottoNumberList; // TODO: this.#outputView.printLottos(lottoNumberList);

    this.#outputView.printLottos(lottoNumberList);
  }

  async #setWinningLotto() {
    const winningLotto = await RetryFunc.executeUntillMaxTry(
      this.#getWinningLotto.bind(this),
    );
    const WinningLottoWithBonusNumber = await RetryFunc.executeUntillMaxTry(
      () => this.#getBonusNumber(winningLotto),
    );

    return WinningLottoWithBonusNumber;
  }

  async #getWinningLotto() {
    const winningLottoInput = [1, 2, 3, 4, 5, 6];
    // const winningLottoInput = await this.#inputView.inputWinningLottoNumber();
    const winningLotto = new LottoMachine().makeWinningLotto(winningLottoInput);

    return winningLotto;
  }

  async #getBonusNumber(winningLotto) {
    const bonusNumber = 7;
    // const bonusNumber = await this.#inputView.inputBonusNumber();
    bonusNumberValidator(winningLotto.getNumbers(), Number(bonusNumber));

    return new WinningLotto(winningLotto, Number(bonusNumber));
  }

  #getGameResult(lottoList, winningLotto) {
    const result = new LottoResult(lottoList, winningLotto);
    const { rank, profit } = result.getResult();

    return { rank, profit }; // TODO: this.#outputView.printResult(rank);

    // this.#outputView.printResult(rank);
    // this.#outputView.printProfit(profit);
  }
}

export default WebController;
