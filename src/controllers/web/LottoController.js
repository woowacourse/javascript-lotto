import View from "../../views/web/View.js";
import issueLottos from "../../domains/issueLottos.js";
import WinningStatistics from "../../domains/WinningStatistics.js";
import { $ } from "../../utils/domUtils.js";

class LottoController {
  constructor() {
    this.lottos = [];
    this.purchaseAmount = 0;
    this.view = new View();
    this.#setEvent();
  }

  #setEvent() {
    this.view.app.addEventListener("purchase", this.#handlePurchase.bind(this));
    this.view.app.addEventListener("result", this.#handleResult.bind(this));
    this.view.app.addEventListener("restart", this.#handleRestart.bind(this));
  }

  #handlePurchase(event) {
    const { purchaseAmount } = event.detail;
    this.purchaseAmount = purchaseAmount;
    this.lottos = issueLottos(this.purchaseAmount);

    const issuedLotto = $("issued-lotto", this.view.app);
    issuedLotto.updateLottos(this.lottos);

    const winningLotto = $("winning-lotto", this.view.app);
    winningLotto.initWinningLotto();
  }

  #handleResult(event) {
    const { winningNumbers, bonusNumber } = event.detail;
    const winningStatistics = new WinningStatistics(this.lottos);
    winningStatistics.calculateWinningResults(winningNumbers, bonusNumber);

    const profitRatio = winningStatistics.calculateProfitRatio(
      this.purchaseAmount,
    );
    const lottoResult = $("lotto-result", this.view.app);

    lottoResult.showResult(winningStatistics.statistics, profitRatio);
  }

  #handleRestart() {
    this.view.render();
  }
}

export default LottoController;
