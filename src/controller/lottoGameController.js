import { LOTTO_PRICE } from "../constants/lotto-constants.js";
import { RETRY_INPUT } from "../constants/view-messages.js";
import { SYMBOL } from "../constants/symbol.js";
import Lotto from "../domain/Lotto.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import executeOrRetryAsync from "../utils/executeOrRetryAsync.js";

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

  async #setLotto() {
    const purchaseAmount = await executeOrRetryAsync({
      asyncFn: this.#getPurchaseAmount.bind(this),
      handleError: console.log,
      retryLimit: 3,
    });

    return this.#getLottoList(purchaseAmount);
  }

  async #getPurchaseAmount() {
    const purchaseAmount = await this.#inputView.inputPurchaseAmount();
    purchaseAmountValidator.validate(purchaseAmount);

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
      acc.push(numbers);
      return acc;
    }, []);

    this.#outputView.printLottos(lottoNumberList);
  }

  async #setWinningLotto() {
    const winningLotto = await executeOrRetryAsync({
      asyncFn: this.#getWinningLotto.bind(this),
      handleError: console.log,
      retryLimit: 3,
    });
    const WinningLottoWithBonusNumber = await executeOrRetryAsync({
      asyncFn: () => this.#getBonusNumber(winningLotto),
      handleError: console.log,
      retryLimit: 3,
    });

    return WinningLottoWithBonusNumber;
  }

  async #getWinningLotto() {
    const winningLottoInput = await this.#inputView.inputWinningLottoNumber();
    const winningLottoNumbers = winningLottoInput
      .split(SYMBOL.DELIMITER)
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
    const lottoResult = new LottoResult(lottoList, winningLotto);
    const totalResult = lottoResult.getTotalResult();
    const profit = lottoResult.getProfit(lottoList.length * LOTTO_PRICE);

    this.#outputView.printResult(totalResult);
    this.#outputView.printProfit(profit);
  }
}

export default LottoGameController;
