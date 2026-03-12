import LottoController from "./LottoController.js";
import WebView from "../view/WebView.js";
import Lotto from "../model/Lotto.js";
import Validator from "../utils/Validator.js";

class WebApp {
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
        if (this.view.isModalVisible()) {
          e.preventDefault();
          location.reload();
        }
      }
    });

  }

  #validatePurchase(price) {
    Validator.validateNumber(price);
    Validator.validatePrice(price);
  }

  #validateWinningNum(winningNumbers) {
    Validator.validateLottoCount(winningNumbers);
    Validator.validateDuplicateLottoNums(winningNumbers);
  }

  #validateBonusNum(winningNumbers, bonusNumber) {
    Validator.validateNumber(bonusNumber);
    Validator.validateLottoNumRange(bonusNumber);
    Validator.validateDuplicateBonusNum(winningNumbers, bonusNumber);

  }

  #handlePurchase() {
    try {
      const purchasedPrice = Number(this.view.getPurchaseAmount());

      this.#validatePurchase(purchasedPrice);

      const lottoCount = purchasedPrice / 1000;
      this.#lottoController = new LottoController(lottoCount);
      const purchasedLottos = this.#lottoController.issueLottos();

      this.view.renderLottoCount(lottoCount);
      this.view.renderLottosContainer(purchasedLottos);

    } catch (error) {

      alert(error.message);
      return;
    }
  }


  #handleResult() {
    try {
      const winningNumbers = this.view.getWinningNumbers();
      const bonusNumber = this.view.getBonusNumber();
      this.#validateWinningNum(winningNumbers);
      this.#validateBonusNum(winningNumbers, bonusNumber)

      winningNumbers.forEach(num => {
        Validator.validateNumber(num);
        Validator.validateLottoNumRange(num);

      });
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

export default WebApp;