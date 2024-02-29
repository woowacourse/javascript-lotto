import { RETRY_INPUT } from "../constants/system.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import RetryFunc from "../utils/RetryFunc.js";
import bonusNumberValidator from "../validator/BonusNumberValidator.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class LottoGameController {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async start() {
    await this.play();
    const restart = await this.#inputView.inputRestartGame();
    if (restart.toLowerCase() === RETRY_INPUT) this.start();
  }

  async play() {
    try {
      const lottoList = await this.#setLotto();
      const winningLotto = await this.#setWinningLotto();
      this.#getGameResult(lottoList, winningLotto);
    } catch (exceedMaxRetryError) {
      this.#outputView.printExceedMaxRetry(exceedMaxRetryError.message);
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
    const purchaseAmount = await this.#inputView.inputPurchaseAmount();
    purchaseAmountValidator(purchaseAmount);

    this.#outputView.printPurchaseMessage(purchaseAmount);
    return Number(purchaseAmount);
  }

  #displayLottoList(lottoList) {
    const lottoNumberList = lottoList.reduce((acc, cur) => {
      const numbers = cur.getNumbers();
      return [...acc, numbers];
    }, []);

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
    const winningLottoInput = await this.#inputView.inputWinningLottoNumber();
    const winningLotto = new LottoMachine().makeWinningLotto(winningLottoInput);

    return winningLotto;
  }

  async #getBonusNumber(winningLotto) {
    const bonusNumber = await this.#inputView.inputBonusNumber();
    bonusNumberValidator(winningLotto.getNumbers(), Number(bonusNumber));

    return WinningLotto(winningLotto, Number(bonusNumber));
  }

  #getGameResult(lottoList, winningLotto) {
    const result = new LottoResult(lottoList, winningLotto);
    const { rank, profit } = result.getResult();

    this.#outputView.printResult(rank);
    this.#outputView.printProfit(profit);
  }
}

export default LottoGameController;
