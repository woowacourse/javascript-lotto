import Money from "../domain/Money.js";
import Lotto from "../domain/Lotto.js";
import LottoNumber from "../domain/LottoNumber.js";
import WinningLotto from "../domain/WinningLotto.js";
import LottoSeller from "../domain/LottoSeller.js";
import LottoResultMaker from "../domain/LottoResultMaker.js";

import InputView from "../view/InputVIew.js";
import OutputView from "../view/OutputView.js";

import { retryOnError } from "../utils/retryOnError.js";
import { parseNumber } from "../utils/parseNumber.js";

import MESSAGES from "../constants/messages.js";

class LottoController {
  #RETRY_YES = ["y", "Y"];
  #RETRY_NO = ["n", "N"];

  async init() {
    const boughtLottos = await this.#processBuyingLottos();
    const winningLotto = await this.#processGettingWinningLotto();

    await this.#processShowingLottoResult(boughtLottos, winningLotto);

    const retryChecker = await retryOnError(this.#readRetryChecker.bind(this));

    if (this.#RETRY_YES.includes(retryChecker)) await this.init();
  }

  async #processBuyingLottos() {
    const boughtLottos = await retryOnError(this.#buyLottos.bind(this));

    OutputView.printBoughtLottoNumbers(
      boughtLottos.map((lotto) => lotto.getNumbers())
    );
    OutputView.printBlankLine();

    return boughtLottos;
  }

  async #processGettingWinningLotto() {
    const lottoWithWinningNumbers = await retryOnError(this.#readLotto);

    OutputView.printBlankLine();
    const winningLotto = await retryOnError(
      this.#getWinningLotto.bind(this),
      lottoWithWinningNumbers
    );

    return winningLotto;
  }

  async #processShowingLottoResult(boughtLottos, winningLotto) {
    const lottoRanks = winningLotto.rankLottos(boughtLottos);

    const rankResult = LottoResultMaker.arrangeRankResult(lottoRanks);
    const profitRate = LottoResultMaker.calculateProfitRate(lottoRanks);

    OutputView.printBlankLine();
    OutputView.printLottoResult(rankResult, profitRate);
  }

  async #buyLottos() {
    const money = await this.#readMoney();

    const lottos = LottoSeller.sell(money);

    return lottos;
  }

  async #getWinningLotto(lotto) {
    const bonusNumber = await this.#readLottoNumber();
    return new WinningLotto(lotto, bonusNumber);
  }

  async #readMoney() {
    const rawAmount = await InputView.readBuyAmount();

    return new Money(parseNumber(rawAmount));
  }

  async #readLotto() {
    const rawLottoNumbers = await InputView.readWinningNumbers();
    const lottoNumberStrings = rawLottoNumbers.split(",");
    const lottoNumbers = lottoNumberStrings.map(parseNumber);

    return new Lotto(lottoNumbers);
  }

  async #readLottoNumber() {
    const rawNumber = await InputView.readBonusNumber();
    const number = Number(rawNumber);

    return new LottoNumber(number);
  }

  async #readRetryChecker() {
    const retryCheck = await InputView.readRetryChecker();

    this.#validateRetryChecker(retryCheck);

    return retryCheck;
  }

  #validateRetryChecker(string) {
    const RETRY_OPTION = [...this.#RETRY_YES, ...this.#RETRY_NO];

    if (!RETRY_OPTION.includes(string)) {
      throw new Error(MESSAGES.ERROR.invalidRetryChecker);
    }
  }
}

export default LottoController;
