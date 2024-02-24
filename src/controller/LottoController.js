import LottoSeller from "../domain/LottoSeller.js";
import LottoValidator from "../domain/LottoValidator.js";
import LottoBoard from "../domain/LottoBoard.js";
import LottoResultMaker from "../domain/LottoResultMaker.js";
import InputView from "../view/InputVIew.js";
import OutputView from "../view/OutputView.js";

import retryWhenErrorOccurs from "../utils/retryWhenErrorOccurs.js";

import MESSAGES from "../view/constants/messages.js";

class LottoController {
  #RETRY_YES = ["y", "Y"];
  #RETRY_NO = ["n", "N"];

  async start() {
    while (true) {
      await this.#play();
      const retryChecker = await retryWhenErrorOccurs(
        this.#readRetryChecker.bind(this)
      );
      if (!this.#isRetryYes(retryChecker)) return;
      OutputView.printBlankLine();
    }
  }

  async #play() {
    const lottos = await this.#readLottos();
    OutputView.printBoughtLottos(lottos.map((lotto) => lotto.slice()));

    const winningLotto = await this.#readWinningLotto();

    const lottoResult = LottoResultMaker.getLottoResult(lottos, winningLotto);

    OutputView.printLottoResult(
      lottoResult.getRankArray(),
      lottoResult.getProfitRate()
    );
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
      () => new LottoBoard(winningNumbers, bonusNumber)
    );

    return winningLotto;
  }

  async #readBonusNumber(winningNumbers) {
    const bonusNumberString = await InputView.readBonusNumber();
    LottoValidator.validateNonNegativeIntegerString(bonusNumberString);

    const bonusNumber = Number(bonusNumberString);
    LottoValidator.validateBonusNumber(bonusNumber, winningNumbers);

    return bonusNumber;
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
