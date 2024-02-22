import Lotto from "../domain/Lotto.js";
import LottoSeller from "../domain/LottoSeller.js";
import LottoValidator from "../domain/LottoValidator.js";
import retryWhenErrorOccurs from "../utils/retryWhenErrorOccurs.js";
import InputView from "../view/InputVIew.js";
import OutputView from "../view/OutputView.js";

class LottoController {
  #minBuyAmount;
  #maxBuyAmount;

  constructor(
    minBuyAmount = LottoSeller.LOTTO_PRICE,
    maxBuyAmount = Number.MAX_SAFE_INTEGER
  ) {
    this.#minBuyAmount = minBuyAmount;
    this.#maxBuyAmount = maxBuyAmount;
  }

  async start() {
    const buyAmount = await retryWhenErrorOccurs(
      this.#readBuyAmount.bind(this)
    );
    const lottos = LottoSeller.sellLottos(buyAmount);
    OutputView.printBoughtLottos(lottos.map((lotto) => lotto.getNumbers()));
    OutputView.printBlankLine();

    const winningNumbers = await retryWhenErrorOccurs(
      this.#readWinningNumbers.bind(this)
    );

    // const bonusNumber = await retryWhenErrorOccurs();
  }

  async #readWinningNumbers() {
    const rawWinningNumbers = await InputView.readWinningNumbers();

    const winningNumberStrings = rawWinningNumbers.split(",");

    winningNumberStrings.forEach((string) => {
      LottoValidator.validateLottoNumberString(string);
    });

    this.#validateUniqueNumbers(winningNumberStrings);

    return winningNumberStrings.map(Number);
  }

  async #readBonusNumber() {
    const rawBonusNumber = await InputView.readBonusNumber();

    LottoValidator.validateNonNegativeIntegerString(rawBonusNumber);

    LottoValidator.validateBonusNumber(Number(rawBonusNumber));
  }

  async #readBuyAmount() {
    const rawBuyAmount = await InputView.readBuyAmount();

    LottoValidator.validateNumberParsable(rawBuyAmount);
    const parsedBuyAmount = Number(rawBuyAmount);
    //this.#validateBuyAmount(parsedBuyAmount);

    return parsedBuyAmount;
  }

  #validateUniqueNumbers(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throw new Error("[ERROR] 중복된 숫자가 존재합니다");
    }
  }
}

export default LottoController;
