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
    const buyAmount = await retryWhenErrorOccurs(
      this.#readBuyAmount.bind(this)
    );

    const lottos = LottoSeller.sellLottos(buyAmount);
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

  async #readBuyAmount() {
    const buyAmountString = await this.#inputView.readBuyAmount();
    LottoValidator.validateNonNegativeIntegerString(buyAmountString);

    const buyAmount = Number(buyAmountString);
    LottoValidator.validateBuyAmount(buyAmount);

    return buyAmount;
  }

  async #readWinningNumbers() {
    const rawWinningNumbers = await this.#inputView.readWinningNumbers();
    const winningNumberStrings = rawWinningNumbers.split(",");
    winningNumberStrings.forEach((string) => {
      LottoValidator.validateNonNegativeIntegerString(string);
    });

    const winningNumbers = winningNumberStrings.map(Number);
    LottoValidator.validateLottoNumbers(winningNumbers);

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
