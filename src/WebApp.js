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
      if ($(".lotto-container_lotto").length !== 0) {
        this.#restartLotto(event);
      } else this.#purchaseLotto();
    });
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

  #restartLotto(event) {
    const userConfirmed = confirm(
      "로또를 재구매 하시겠습니까? \n 구매한 로또 목록은 삭제됩니다."
    );
    if (!userConfirmed) {
      event.preventDefault();
      return;
    } else {
      resetLotto();
    }
  }

  #purchaseLotto() {
    this.price = repeatGetPrice();
    if (this.price === "") return;
    printLottoCount(this.price);
    this.lottos = LottoManager.generateLottos(this.price);
    printLottos(this.lottos);
  }

  #compareLotto() {
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
