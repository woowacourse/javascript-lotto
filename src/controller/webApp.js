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
    this.view.purchase.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#handlePurchase();
    });

    this.view.winning.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#handleResult();
    });

    this.view.lotto.$displayMoreBtn.addEventListener('click', () => {
      this.view.lotto.$container.classList.remove('collapsed');
      this.view.lotto.$displayMoreBtn.classList.add('hidden');
      this.view.lotto.$hideBtn.classList.remove('hidden');
    });

    this.view.lotto.$hideBtn.addEventListener('click', () => {
      this.view.lotto.$container.classList.add('collapsed');
      this.view.lotto.$displayMoreBtn.classList.remove('hidden');
      this.view.lotto.$hideBtn.classList.add('hidden');
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && this.view.isModalVisible()) {
        e.preventDefault();
        location.reload();
      }
    });
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
    }
  }

  #handleResult() {
    try {
      const winningNumbers = this.view.getWinningNumbers();
      const bonusNumber = this.view.getBonusNumber();

      this.#validateWinningNum(winningNumbers);
      this.#validateBonusNum(winningNumbers, bonusNumber);

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
    }
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
}

export default WebApp;