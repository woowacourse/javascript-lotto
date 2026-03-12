import LottoController from "./LottoController.js";
import WebView from "../view/WebView.js";
import Lotto from "../model/Lotto.js";
import Validator from "../utils/Validator.js";

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

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (!this.view.$modalSection.classList.contains("hidden")) {
          e.preventDefault(); 
          location.reload();  
        }
      }
    });

  }

  #handlePurchase() {
    const purchasedPrice = Number(this.view.getPurchaseAmount());
    try {
      Validator.validateNumber(purchasedPrice);
      Validator.validatePrice(purchasedPrice);

      const lottoCount = purchasedPrice / 1000;
      this.#lottoController = new LottoController(lottoCount);
      const purchasedLottos = this.#lottoController.issueLottos();

      this.view.renderLottoCount(lottoCount);
      this.view.renderLottosContainer(purchasedLottos);

    } catch (error) {

      alert(error.message);
      return;
    }

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

    try {
      Validator.validateLottoCount(winningNumbers);
      Validator.validateDuplicateLottoNums(winningNumbers);
      winningNumbers.forEach(num => {
        Validator.validateNumber(num);
        Validator.validateLottoNumRange(num);
      });

      Validator.validateNumber(bonusNumber);
      Validator.validateLottoNumRange(bonusNumber);
      Validator.validateDuplicateBonusNum(winningNumbers, bonusNumber);

      const winningLotto = new Lotto(winningNumbers);
      this.#lottoController.updateWinningResult(winningLotto, bonusNumber);

      const { rankCount, profitRate } = this.#lottoController.getWinningResult();
      this.view.renderResultTable(rankCount, profitRate);
    } catch (error) {
      alert(error.message);
      return;
    }
  }
}

export default webApp;