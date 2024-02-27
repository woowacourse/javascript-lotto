import LottoStore from "../domains/LottoStore";
import LottoResult from "../domains/LottoResult";
import InputView from "../views/InputView";
import OutputView from "../views/OutputView";
import WinningLotto from "../domains/WinningLotto";
import Lotto from "../domains/Lotto";
import RETRY_SIGN from "../constants/retry-sign";
import InvalidInputException from "../exceptions/InvalidInputException";
import { ERROR_MESSAGES } from "../constants/message";
import { LOTTO_RANK_CONDITION, LOTTO_REWARDS } from "../constants/rules";

class LottoGame {
  #lottoRules;
  #lottos;

  constructor(lottoRules) {
    this.#lottoRules = lottoRules;
  }

  async start() {
    OutputView.printGameIntro();
    await this.#processGame();
  }

  async #processGame() {
    await this.#purchaseLottos();
    this.#printPurchaseLottos();

    const winningNumber = await this.#getWinningNumber();
    const winningLotto = await this.#getWinningLotto(winningNumber);

    this.#printLottoResult(winningLotto);

    await this.#handleRetry();
  }

  async #purchaseLottos() {
    const purchaseAmount = await InputView.readPurchaseAmount();

    try {
      this.#lottos = new LottoStore(this.#lottoRules).publishLottos(
        purchaseAmount
      );
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#purchaseLottos();
    }
  }

  #printPurchaseLottos() {
    const lottoNumbers = this.#lottos.map((lotto) => lotto.getNumbers());

    OutputView.printLottoCount(this.#lottos.length);
    OutputView.printTotalLottos(lottoNumbers);
  }

  async #getWinningNumber() {
    try {
      const rawWinningNumber = await InputView.readWinningNumber();
      const winningNumber = rawWinningNumber
        .split(",")
        .map((number) => Number(number));

      return new Lotto(winningNumber, this.#lottoRules).getNumbers();
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#getWinningNumber();
    }
  }

  async #getWinningLotto(winningNumber) {
    try {
      const bonusNumber = await this.#getBonusNumber();

      return new WinningLotto(
        new Lotto(winningNumber, this.#lottoRules),
        bonusNumber,
        this.#lottoRules
      );
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#getWinningLotto(winningNumber);
    }
  }

  async #getBonusNumber() {
    return await InputView.readBonusNumber();
  }

  #printLottoResult(winningLotto) {
    const lottoResult = new LottoResult(this.#lottoRules);
    const resultBoard = lottoResult.generateResultBoard(
      this.#lottos,
      winningLotto
    );
    const returnRate = lottoResult.calculateReturnRate(
      this.#lottos.length * this.#lottoRules.getLottoPrice()
    );

    OutputView.printWinningResult({
      resultBoard,
      rewards: LOTTO_REWARDS,
      rankCondition: LOTTO_RANK_CONDITION,
    });
    OutputView.printReturnRate(returnRate);
  }

  async #handleRetry() {
    try {
      const retrySign = await this.#getRetrySign();
      if (retrySign === RETRY_SIGN.yes) {
        this.#processGame();
      }
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#handleRetry();
    }
  }

  async #getRetrySign() {
    const rawRetrySign = await InputView.readRetrySign();
    const retrySign = rawRetrySign.trim().toLowerCase();

    this.#validateRetrySign(retrySign);

    return retrySign;
  }

  #validateRetrySign(retrySign) {
    if (retrySign !== RETRY_SIGN.yes && retrySign !== RETRY_SIGN.no) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidRetrySign);
    }
  }
}

export default LottoGame;
