import LottoController from "./LottoController.js";
import WebView from "../view/WebView.js";
import Lotto from "../model/Lotto.js"; 
class webApp {
  #lottoController;
  constructor() {
    this.view = new WebView();
  }

  init() {
    this.view.$purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#handlePurchase();
    });

    this.view.$winningForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#handleResult();
    });
  }

  #handlePurchase() {
    const purchasedPrice = Number(this.view.getPurchaseAmount());

    const lottoCount = purchasedPrice / 1000;

    this.view.renderLottoCount(lottoCount);
    this.#lottoController = new LottoController(lottoCount);
    const purchasedLottos = this.#lottoController.issueLottos();

    this.view.renderLottoCount(lottoCount);
    this.view.renderLottosContainer(purchasedLottos);
  }

  #handleResult() {
    const winningNumbers = this.view.getWinningNumbers();
    const bonusNumber = this.view.getBonusNumber();

    const winningLotto = new Lotto(winningNumbers);

    this.#lottoController.updateWinningResult(winningLotto, bonusNumber);

    const {rankCount,profitRate}= this.#lottoController.getWinningResult();

    this.view.renderResultTable(rankCount,profitRate);
  }
}

export default webApp;