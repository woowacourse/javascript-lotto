import Lotto from "../../domain/Lotto.js";
import WinningNumber from "../../domain/WinningNumber.js";
import { isNumber, isNumberArray } from "../../utils/inputValidator.js";
import { toSplitComma, toNumber } from "../../utils/parser.js";

export default class ConsoleApp {
  static ANSWER = { YES: "y", NO: "n" };

  #lottoFacade;
  #ui;

  constructor({ lottoFacade, ui }) {
    this.#lottoFacade = lottoFacade;
    this.#ui = ui;
  }

  async run() {
    await this.#retry(() => this.#lottoGame());
  }

  async #lottoGame() {
    do {
      const purchaseDto = await this.#retry(() => this.#processPurchase());

      const winningNumbersRaw = await this.#retry(() =>
        this.#processWinningNumber(),
      );
      const bonusNumberRaw = await this.#retry(() =>
        this.#processWinningBonus(winningNumbersRaw),
      );

      this.#processStatistics({
        purchaseDto,
        winningNumbersRaw,
        bonusNumberRaw,
      });
    } while (await this.#retry(() => this.#processAskRetry()));
  }

  async #processPurchase() {
    const inputAmount = await this.#ui.readAmount();
    const amountRaw = isNumber(toNumber(inputAmount));

    const purchaseDto = this.#lottoFacade.purchase({ amountRaw });
    this.#ui.printLottos(purchaseDto.lottos);
    return purchaseDto;
  }

  async #processWinningNumber() {
    const rawNumbers = await this.#ui.readWinningLottoNumber();
    const numbers = isNumberArray(toSplitComma(rawNumbers));
    Lotto.validate(numbers);
    return numbers;
  }

  async #processWinningBonus(numbers) {
    const rawBonus = await this.#ui.readBonusNumber();
    const bonusNumber = isNumber(toNumber(rawBonus));
    WinningNumber.validate(numbers, bonusNumber);
    return bonusNumber;
  }

  #processStatistics({ purchaseDto, winningNumbersRaw, bonusNumberRaw }) {
    const { lottos, purchasedAmount } = purchaseDto;
    const statsDto = this.#lottoFacade.getStatistics({
      lottosRaw: lottos,
      purchasedRaw: purchasedAmount,
      winningNumbersRaw,
      bonusNumberRaw,
    });
    this.#ui.printStatistics(statsDto.lottosResult);
    this.#ui.printProfit(statsDto.profitRate);
  }

  async #processAskRetry() {
    const { YES, NO } = ConsoleApp.ANSWER;
    const rawAnswer = await this.#ui.readAskRetry();
    const answer = rawAnswer.toLowerCase();

    if (answer === YES) return true;
    if (answer === NO) return false;
    throw new Error("y나 n을 입력해주세요.");
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
