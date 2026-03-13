import Lotto from "../../domain/Lotto.js";
import WinningUseCase from "../../features/winning/WinningUseCase.js";
import LottoStatisticsUseCase from "../../features/statistics/LottoStatisticsUseCase.js";
import { calculateProfit } from "../../features/statistics/lottoStatistics.js";
import { isNumber, isNumberArray } from "../../utils/inputValidator.js";
import { toSplitComma, toNumber } from "../../utils/parser.js";
export default class ConsoleApp {
  static ANSWER = { YES: "y", NO: "n" };

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
      const { lottos, purchasedAmount } = await this.#retry(() =>
        this.#processPurchase(),
      );
      const numbers = await this.#retry(() => this.#processWinningNumber());
      const winningNumber = await this.#retry(() =>
        this.#processWinningBonus(numbers),
      );
      const totalPrize = await this.#processStatistics(lottos, winningNumber);
      this.#processProfit(purchasedAmount, totalPrize);
    } while (await this.#retry(() => this.#processAskRetry()));
  }

  async #processPurchase() {
    const rawAmount = await this.#ui.readAmount();
    const amount = isNumber(toNumber(rawAmount));

    const { lottos, purchasedAmount } =
      this.#purchaseLottoUseCase.execute(amount);
    const lottoNumbersList = lottos.map((lotto) => lotto.getNumbers());
    this.#ui.printLottos(lottoNumbersList);
    return { lottos, purchasedAmount };
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

  async #processStatistics(lottos, winningNumber) {
    const { lottosResult, totalPrize } =
      LottoStatisticsUseCase.statisticsLottos(lottos, winningNumber);
    this.#ui.printStatistics(lottosResult);
    return totalPrize;
  }

  async #processProfit(purchasedAmount, totalPrize) {
    const profit = calculateProfit(purchasedAmount, totalPrize);
    this.#ui.printProfit(profit);
  }

  async #processAskRetry() {
    const { YES, NO } = ConsoleApp.ANSWER;
    const rawAnswer = await this.#ui.readAskRetry();
    const answer = rawAnswer.toLowerCase();
    if (answer === YES) return true;
    if (answer === NO) return false;
    throw new Error("y나 n을 입력해주세요");
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
