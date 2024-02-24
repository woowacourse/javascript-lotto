import { MIN_PURCHASE_AMOUNT, OPTION } from "../constants/option.js";
import { RETRY_INPUT } from "../constants/system.js";
import Lotto from "../domain/Lotto.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import RetryFunc from "../utils/RetryFunc.js";
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
    if (restart === RETRY_INPUT) this.start();
  }

  async play() {
    try {
      const lottoList = await this.#setLotto();
      const winningLotto = await this.#setWinningLotto();
      this.#getGameResult(lottoList, winningLotto);
    } catch (error) {
      this.#outputView.printExceedMaxRetry(error.message);
    }
  }

  async #setLotto() {
    const purchaseAmount = await RetryFunc.executeUntillMaxTry(
      this.#getPurchaseAmount.bind(this),
    );

    return this.#getLottoList(purchaseAmount);
  }

  async #getPurchaseAmount() {
    const purchaseAmount = await this.#inputView.inputPurchaseAmount();
    purchaseAmountValidator(purchaseAmount);

    this.#outputView.printPurchaseMessage(purchaseAmount);
    return Number(purchaseAmount);
  }

  async #getLottoList(purchaseAmount) {
    const lottoMachine = new LottoMachine(purchaseAmount);
    const lottoList = lottoMachine.makeLottos();

    this.#displayLottoList(lottoList);

    return lottoList;
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
    const winningLottoNumbers = winningLottoInput
      .split(OPTION.DELIMITER)
      .map((number) => Number(number));
    const winningLotto = new Lotto(winningLottoNumbers);

    return winningLotto;
  }

  async #getBonusNumber(winningLotto) {
    const bonusNumber = await this.#inputView.inputBonusNumber();
    const WinningLottoWithBonusNumber = new WinningLotto(
      winningLotto,
      Number(bonusNumber),
    );

    return WinningLottoWithBonusNumber;
  }

  #getGameResult(lottoList, winningLotto) {
    const result = new LottoResult(lottoList, winningLotto);
    const rank = result.getTotalResult();
    const profit = result.getProfit(lottoList.length * MIN_PURCHASE_AMOUNT);

    this.#outputView.printResult(rank);
    this.#outputView.printProfit(profit);
  }
}

export default LottoGameController;
