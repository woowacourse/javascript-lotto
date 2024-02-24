import LottoValidator from "./LottoValidator";
import LottoSeller from "../domain/LottoSeller";

import retryWhenErrorOccurs from "../utils/retryWhenErrorOccurs";
import LottoBoard from "../domain/LottoBoard";

class LottoInputController {
  #inputView;

  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async readLottos() {
    const buyPrice = await retryWhenErrorOccurs(this.#readBuyPrice.bind(this));

    const lottos = LottoSeller.sellLottos(buyPrice);
    return lottos;
  }

  async readLottoBoard() {
    const winningNumbers = await this.#readWinningNumbersUntilOccurError();
    this.#outputView.printBlankLine();
    const bonusNumber = await this.#readBonusNumberUntilOccurError(
      winningNumbers
    );
    const lottoBoard = new LottoBoard(winningNumbers, bonusNumber);

    return lottoBoard;
  }

  async #readWinningNumbersUntilOccurError() {
    const winningNumber = await retryWhenErrorOccurs(
      this.#readWinningNumbers.bind(this)
    );

    return winningNumber;
  }

  async #readBonusNumberUntilOccurError(winningNumbers) {
    const bonusNumber = await retryWhenErrorOccurs(
      this.#readBonusNumber.bind(this),
      winningNumbers
    );

    return bonusNumber;
  }

  async #readBuyPrice() {
    const buyPriceString = await this.#inputView.readBuyPrice();
    LottoValidator.validateNonNegativeIntegerString(buyPriceString);

    const buyPrice = Number(buyPriceString);
    LottoValidator.validateBuyPrice(buyPrice);

    return buyPrice;
  }

  async #readWinningNumbers() {
    const rawWinningNumbers = await this.#inputView.readWinningNumbers();
    const winningNumberStrings = rawWinningNumbers.split(",");
    winningNumberStrings.forEach((string) => {
      LottoValidator.validateNonNegativeIntegerString(string);
    });
    const winningNumbers = winningNumberStrings.map(Number);
    LottoValidator.validateLotto(winningNumbers);
    return winningNumbers;
  }

  async #readBonusNumber(winningNumbers) {
    const bonusNumberString = await this.#inputView.readBonusNumber();
    LottoValidator.validateNonNegativeIntegerString(bonusNumberString);

    const bonusNumber = Number(bonusNumberString);
    LottoValidator.validateBonusNumber(bonusNumber, winningNumbers);

    return bonusNumber;
  }
}

export default LottoInputController;
