import LottoManager from "./domain/LottoManager";
import LottoPrize from "./domain/LottoPrize";
import { repeatGetPrice, repeatWinningLotto } from "./view/web/input";
import { allowModalOpen } from "./view/web/modal";
import {
  printLottoCount,
  printLottoResult,
  printLottos,
} from "./view/web/output";
import { focusInput, resetLotto } from "./view/web/setup";

export class WebApp {
  constructor() {
    resetLotto();
    this.price = 0;
    this.lottos = [];
    this.#setResetButton();
    this.#setPurchaseButton();
    this.#setWinningLottoButton();
  }

  #setResetButton() {
    $(".restart-button").on("click", () => {
      resetLotto();
      focusInput(".input-contents input");
    });
  }

  #setPurchaseButton() {
    $(".input-contents button").on("click", (event) => {
      event.preventDefault();
      this.#purchaseLotto();
    });
  }

  async #purchaseLotto() {
    this.price = repeatGetPrice();
    if (this.price === "") return;
    printLottoCount(this.price);
    this.lottos = LottoManager.generateLottos(this.price);
    printLottos(this.lottos);
  }

  #setWinningLottoButton() {
    $("#lottoForm").on("submit", (event) => {
      event.preventDefault();
      if ($(".prize-contents_rate-result").length !== 0) {
        return;
      }
      this.#compareLotto();
    });
  }

  async #compareLotto() {
    const { winningNumbers, bonusNumber } = repeatWinningLotto();
    if (winningNumbers === undefined || bonusNumber === undefined) return;

    const lottoPrize = new LottoPrize(this.lottos);
    const prizeResult = lottoPrize.calculateWinnings(
      winningNumbers,
      bonusNumber
    );
    const ROI = lottoPrize.calculateROI(this.price, prizeResult);

    this.printResult(prizeResult, ROI);
  }

  printResult(prizeResult, ROI) {
    allowModalOpen();
    printLottoResult(prizeResult, ROI);
  }
}
