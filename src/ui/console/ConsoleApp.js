import Lotto from "../../domain/Lotto.js";
import WinningUseCase from "../../features/winning/WinningUseCase.js";
import { isNumber, isNumberArray } from "../../utils/inputValidator.js";
import { toSplitComma, toNumber } from "../../utils/parser.js";
export default class ConsoleApp {
  #purchaseLottoUseCase;
  #ui;

  constructor({ purchaseLottoUseCase, ui }) {
    this.#purchaseLottoUseCase = purchaseLottoUseCase;
    this.#ui = ui;
  }

  async run() {
    await this.#retry(() => this.#lottoGame());
  }

  async #lottoGame() {
    do {
      const { lottoNumbers, purchasedAmount } = await this.#retry(() =>
        this.#processPurchase(),
      );
      const numbers = await this.#retry(() => this.#processWinningNumber());
      const winningNumber = await this.#retry(() =>
        this.#processWinningBonus(numbers),
      );
    } while (false);
  }

  async #processPurchase() {
    const rawAmount = await this.#ui.readAmount();
    const amount = isNumber(toNumber(rawAmount));

    const { lottoNumbers, purchasedAmount } =
      this.#purchaseLottoUseCase.execute(amount);
    this.#ui.printLottos(lottoNumbers);
    return { lottoNumbers, purchasedAmount };
  }

  async #processWinningNumber() {
    const rawNumbers = await this.#ui.readWinningLottoNumber();
    const numbers = isNumberArray(toSplitComma(rawNumbers));
    Lotto.validate(numbers);
    return numbers;
  }

  async #processWinningBonus(numbers) {
    const rawBonus = await this.#ui.readBonusNumber();
    const bonus = isNumber(toNumber(rawBonus));
    return WinningUseCase.execute(numbers, bonus);
  }

  async #retry(fn) {
    while (true) {
      try {
        return await fn();
      } catch (error) {
        this.#ui.printError(error);
      }
    }
  }
}
