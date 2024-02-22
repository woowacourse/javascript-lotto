import { MIN_PURCHASE_AMOUNT, OPTION } from "../constants/option.js";
import { RETRY_INPUT } from "../constants/system.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
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

  async play() {
    const lottoList = await this.#setLotto();

    const winningLotto = await this.#setWinningLotto();

    this.#getGameResult(lottoList, winningLotto);

    const restart = await this.#inputView.inputRestartGame();
    if (restart === RETRY_INPUT) this.play();
  }

  async #executeOrRetryAsync(asyncFn) {
    try {
      return await asyncFn();
    } catch (error) {
      OutputView.printError(error.message);
      return this.#executeOrRetryAsync(asyncFn);
    }
  }

  async #setLotto() {
    const purchaseAmount = await this.#executeOrRetryAsync(
      this.#getPurchaseAmount.bind(this),
    );

    return this.#getLottoList(purchaseAmount);
  }

  async #getPurchaseAmount() {
    const puchaseAmount = await this.#inputView.inputPurchaseAmount();
    purchaseAmountValidator.validate(puchaseAmount);

    this.#outputView.printPurchaseMessage(puchaseAmount);
    return Number(puchaseAmount);
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
      acc.push(numbers);
      return acc;
    }, []);

    this.#outputView.printLottos(lottoNumberList);
  }

  async #setWinningLotto() {
    const winningLotto = await this.#executeOrRetryAsync(
      this.#getWinningLotto.bind(this),
    );
    const WinningLottoWithBonusNumber = await this.#executeOrRetryAsync(() =>
      this.#getBonusNumber(winningLotto),
    );

    return WinningLottoWithBonusNumber;
  }

  async #getWinningLotto() {
    const winningLottoNumbers = await this.#getWinningNumber();
    const winningLotto = new WinningLotto(winningLottoNumbers);

    return winningLotto;
  }

  async #getBonusNumber(winningLotto) {
    const bonusNumber = await this.#inputView.inputBonusNumber();
    winningLotto.setBonusNumber(bonusNumber);

    return winningLotto;
  }

  async #getWinningNumber() {
    const winningLottoInput = await this.#inputView.inputWinningLottoNumber();
    const winningLottoNumbers = winningLottoInput
      .split(OPTION.DELIMITER)
      .map((number) => Number(number));

    return winningLottoNumbers;
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
