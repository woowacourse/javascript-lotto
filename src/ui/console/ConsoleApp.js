import Lotto from "../../domain/Lotto.js";
import WinningNumber from "../../domain/WinningNumber.js";
import WinningUseCase from "../../features/winning/WinningUseCase.js";
import statisticsUseCase from "../../features/statistics/statisticsUseCase.js";
import { calculateProfit } from "../../features/statistics/statisticsUtils.js";
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
      const purchaseDto = await this.#retry(() => this.#processPurchase());
      const winningNumber = await this.#retry(() =>
        this.#processWinningNumber(),
      );
      const bonusNumber = await this.#retry(() =>
        this.#processWinningBonus(winningNumber),
      );
      const { totalPrize } = await this.#processStatistics(purchaseDto.lottos, {
        winningNumber,
        bonusNumber,
      });
      this.#processProfit(purchaseDto.purchasedAmount, totalPrize);
    } while (await this.#retry(() => this.#processAskRetry()));
  }

  async #processPurchase() {
    const rawAmount = await this.#ui.readAmount();
    const amount = isNumber(toNumber(rawAmount));

    const purchaseDto = this.#purchaseLottoUseCase.execute(amount);
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

  async #processStatistics(lottosNumbers, { winningNumber, bonusNumber }) {
    const winningLotto = WinningUseCase.execute(winningNumber, bonusNumber);
    const lottoStatsDto = statisticsUseCase.statisticsLottos(
      lottosNumbers,
      winningLotto,
    );

    this.#ui.printStatistics(lottoStatsDto.lottosResult);
    return lottoStatsDto;
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
