import Lotto from "../domain/Lotto.js";
import LottoSeller from "../domain/LottoSeller.js";
import LottoValidator from "../domain/LottoValidator.js";
import retryWhenErrorOccurs from "../utils/retryWhenErrorOccurs.js";
import InputView from "../view/InputVIew.js";
import OutputView from "../view/OutputView.js";

class LottoController {
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

    const bonusNumber = await retryWhenErrorOccurs(
      this.#readBonusNumber,
      winningNumbers
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

  async #readBonusNumber(winningNumbers) {
    const rawBonusNumber = await InputView.readBonusNumber();

    LottoValidator.validateNonNegativeIntegerString(rawBonusNumber);

    const parsedBonusNumber = Number(rawBonusNumber);

    LottoValidator.validateBonusNumber(parsedBonusNumber, winningNumbers);

    return parsedBonusNumber;
  }

  #validate() {}

  async #readBuyAmount() {
    const rawBuyAmount = await InputView.readBuyAmount();

    LottoValidator.validateNonNegativeIntegerString(rawBuyAmount);

    const parsedBuyAmount = Number(rawBuyAmount);

    LottoValidator.validateBuyAmount(parsedBuyAmount);

    return parsedBuyAmount;
  }

  #validateUniqueNumbers(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throw new Error("[ERROR] 중복된 숫자가 존재합니다");
    }
  }
}

export default LottoController;
