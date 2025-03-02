import View from "../../views/web/View.js";
import issueLottos from "../../domains/issueLottos.js";
import WinningStatistics from "../../domains/WinningStatistics.js";
import { $ } from "../../utils/domUtils.js";
import { EVENT_TYPES } from "../../constants/constants.js";

class LottoController {
  constructor() {
    this.lottos = [];
    this.purchaseAmount = 0;
    this.view = new View();
    this.#setEvent();
  }

  #setEvent() {
    this.view.app.addEventListener(
      EVENT_TYPES.purchase,
      this.#handlePurchase.bind(this),
    );
    this.view.app.addEventListener(
      EVENT_TYPES.result,
      this.#handleResult.bind(this),
    );
    this.view.app.addEventListener(
      EVENT_TYPES.restart,
      this.#handleRestart.bind(this),
    );
  }

  #handlePurchase(event) {
    this.#setPurchaseAmount(event);
    this.lottos = issueLottos(this.purchaseAmount);
    this.#updateIssuedLotto();
    this.#initWinningLotto();
  }

  #setPurchaseAmount(event) {
    const { purchaseAmount } = event.detail;
    this.purchaseAmount = purchaseAmount;
  }

  #updateIssuedLotto() {
    const issuedLotto = $("issued-lotto", this.view.app);
    issuedLotto.updateLottos(this.lottos);
  }

  #initWinningLotto() {
    const winningLotto = $("winning-lotto", this.view.app);
    winningLotto.initWinningLotto();
  }

  #handleResult(event) {
    const winningStatistics = this.#calculateWinningStatistics(event);
    const profitRatio = this.#calculateProfitRatio(winningStatistics);
    this.#showResult(winningStatistics, profitRatio);
  }

  #calculateWinningStatistics(event) {
    const { winningNumbers, bonusNumber } = event.detail;
    const winningStatistics = new WinningStatistics(this.lottos);
    winningStatistics.calculateWinningResults(winningNumbers, bonusNumber);
    return winningStatistics;
  }

  #calculateProfitRatio(winningStatistics) {
    return winningStatistics.calculateProfitRatio(this.purchaseAmount);
  }

  #showResult(winningStatistics, profitRatio) {
    const lottoResult = $("lotto-result", this.view.app);
    lottoResult.showResult(winningStatistics.statistics, profitRatio);
  }

  #handleRestart() {
    this.view.render();
  }
}

export default LottoController;
