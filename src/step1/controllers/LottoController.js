import { ERROR_MESSAGES } from '../constants/message';
import RETRY_SIGN from '../constants/retry-sign';
import LOTTO_RULES from '../constants/rules';
import Lotto from '../domains/Lotto';
import LottoResult from '../domains/LottoResult';
import LottoStore from '../domains/LottoStore';
import WinningLotto from '../domains/WinningLotto';
import InvalidInputException from '../exceptions/InvalidInputException';
import InputView from '../views/InputView';
import OutputView from '../views/OutputView';

class LottoController {
  #lottos;

  #winningLotto;

  constructor() {
    this.#lottos = null;
    this.#winningLotto = null;
  }

  async #purchaseLottos() {
    const lottoAmount = await InputView.readPurchaseAmount();

    try {
      this.#lottos = LottoStore.purchaseLottos(lottoAmount);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#purchaseLottos();
    }
  }

  async #getWinningLotto() {
    const winningNumber = await InputView.readWinningLotto();
    const winningNumberArray = winningNumber.split(',').map((winningNumber) => Number(winningNumber));

    try {
      return new Lotto(winningNumberArray);
    } catch (error) {
      OutputView.printMessage(error.message);
      return await this.#getWinningLotto();
    }
  }

  async #configWinningLotto(winningLotto) {
    const bonusNumber = await InputView.readBonusNumber();

    try {
      this.#winningLotto = new WinningLotto(winningLotto, bonusNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#configWinningLotto(winningLotto);
    }
  }

  printLottos() {
    const lottoNumbers = this.#lottos.map((lotto) => lotto.getNumbers());
    const lottosCount = lottoNumbers.length;
    OutputView.printTotalLottos(lottoNumbers, lottosCount);
  }

  #printWinningResult() {
    const lottoResult = new LottoResult();
    lottoResult.generateResult(this.#lottos, this.#winningLotto);

    const lottoResultBoard = lottoResult.getRankBoard();
    OutputView.printWinningResult(lottoResultBoard);

    const returnRate = lottoResult.calculateReturnRate(this.#lottos.length * LOTTO_RULES.price);
    OutputView.printReturnRate(returnRate);
  }

  #validateRetrySign(sign) {
    if (sign !== RETRY_SIGN.yes && sign !== RETRY_SIGN.no) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidRetrySign);
    }
  }

  async #handleRetry(sign) {
    if (sign === RETRY_SIGN.yes) {
      await this.run();
    }
  }

  async #processRetrySign() {
    const retrySign = await InputView.readRetrySign();
    const formattedRetrySign = retrySign.trim().toLowerCase();

    try {
      this.#validateRetrySign(formattedRetrySign);
      this.#handleRetry(formattedRetrySign);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.#handleRetry();
    }
  }

  async run() {
    await this.#purchaseLottos();
    this.printLottos();

    const winningLotto = await this.#getWinningLotto();
    await this.#configWinningLotto(winningLotto);
    this.#printWinningResult();

    this.#processRetrySign();
  }
}

export default LottoController;
