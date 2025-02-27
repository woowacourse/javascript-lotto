import View from "../../views/web/View.js";
import issueLottos from "../../domains/issueLottos.js";
import WinningStatistics from "../../domains/WinningStatistics.js";

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
  }

  #handlePurchase(event) {
    const { purchaseAmount } = event.detail;
    this.purchaseAmount = purchaseAmount;
    this.lottos = issueLottos(this.purchaseAmount);

    const issuedLotto = this.view.app.querySelector("issued-lotto");
    issuedLotto.updateLottos(this.lottos);

    const winningLotto = this.view.app.querySelector("winning-lotto");
    winningLotto.initWinningLotto();
  }

  #handleResult(event) {
    const { winningNumbers, bonusNumber } = event.detail;
    const winningStatistics = new WinningStatistics(this.lottos);
    winningStatistics.calculateWinningResults(winningNumbers, bonusNumber);

    const profitRatio = winningStatistics.calculateProfitRatio(
      this.purchaseAmount,
    );
    const lottoResult = this.view.app.querySelector("lotto-result");

    lottoResult.showResult(winningStatistics.statistics, profitRatio);
  }
}

export default LottoController;
