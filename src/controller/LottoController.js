import LottoResultMaker from "../domain/LottoResultMaker.js";
import LottoSeller from "../domain/LottoSeller.js";
import LottoValidator from "../domain/LottoValidator.js";
import WinningLotto from "../domain/WinningLotto.js";
import retryWhenErrorOccurs from "../utils/retryWhenErrorOccurs.js";
import InputView from "../view/InputVIew.js";
import OutputView from "../view/OutputView.js";
import MESSAGES from "../constants/messages.js";

class LottoController {
  #RETRY_YES = ["y", "Y"];
  #RETRY_NO = ["n", "N"];

  async start() {
    await this.#play();
    const retryChecker = await retryWhenErrorOccurs(
      this.#readRetryChecker.bind(this)
    );
    if (this.#isRetryYes(retryChecker)) await this.start();
    OutputView.printBlankLine();
  }

  async #play() {
    const lottos = await this.#readLottos();
    OutputView.printBoughtLottos(lottos.map((lotto) => lotto.getNumbers()));

    const winningLotto = await this.#readWinningLotto();

    const lottoRanks = winningLotto.getLottosRanks(lottos);
    const { rankResult, profitRate } =
      LottoResultMaker.getLottoResult(lottoRanks);

    OutputView.printLottoResult(rankResult, profitRate);
  }

  async #readWinningNumbers() {
    const rawWinningNumbers = await InputView.readWinningNumbers();
    const winningNumberStrings = rawWinningNumbers.split(",");
    winningNumberStrings.forEach((string) => {
      LottoValidator.validateLottoNumberString(string);
    });

    const parsedWinningNumbers = winningNumberStrings.map(Number);
    LottoValidator.validateLottoNumbers(parsedWinningNumbers);

    return parsedWinningNumbers;
  }

  async #readLottos() {
    const buyAmount = await retryWhenErrorOccurs(
      this.#readBuyAmount.bind(this)
    );

    const lottos = LottoSeller.sellLottos(buyAmount);

    return lottos;
  }

  async #readWinningLotto() {
    const winningNumbers = await retryWhenErrorOccurs(
      this.#readWinningNumbers.bind(this)
    );
    OutputView.printBlankLine();
    const bonusNumber = await retryWhenErrorOccurs(
      this.#readBonusNumber,
      winningNumbers
    );
    const winningLotto = await retryWhenErrorOccurs(
      () => new WinningLotto(winningNumbers, bonusNumber)
    );

    return winningLotto;
  }

  async #readBonusNumber(winningNumbers) {
    const rawBonusNumber = await InputView.readBonusNumber();
    LottoValidator.validateNonNegativeIntegerString(rawBonusNumber);

    const parsedBonusNumber = Number(rawBonusNumber);
    LottoValidator.validateBonusNumber(parsedBonusNumber, winningNumbers);

    return parsedBonusNumber;
  }

  async #readRetryChecker() {
    const retryCheck = await InputView.readRetryChecker();
    this.#validateRetryChecker(retryCheck);

    return retryCheck;
  }

  async #readBuyAmount() {
    const rawBuyAmount = await InputView.readBuyAmount();
    LottoValidator.validateNonNegativeIntegerString(rawBuyAmount);

    const parsedBuyAmount = Number(rawBuyAmount);
    LottoValidator.validateBuyAmount(parsedBuyAmount);

    return parsedBuyAmount;
  }

  #validateRetryChecker(string) {
    const RETRY_OPTION = [...this.#RETRY_YES, ...this.#RETRY_NO];

    if (!RETRY_OPTION.includes(string)) {
      throw new Error(MESSAGES.ERROR.invalidRetryChecker);
    }
  }

  #isRetryYes(retryChecker) {
    return this.#RETRY_YES.includes(retryChecker);
  }
}

export default LottoController;
