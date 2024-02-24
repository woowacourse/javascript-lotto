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
    const winningNumbers = await retryWhenErrorOccurs(
      this.#readWinningNumbers.bind(this)
    );
    this.#outputView.printBlankLine();
    const bonusNumber = await retryWhenErrorOccurs(
      this.#readBonusNumber.bind(this),
      winningNumbers
    );
    const lottoBoard = await retryWhenErrorOccurs(
      () => new LottoBoard(winningNumbers, bonusNumber)
    );

    return lottoBoard;
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
