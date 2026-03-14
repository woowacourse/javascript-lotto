import { LOTTO_PRICE } from "../constants/lottoInfo";
import LottoController from "./LottoController";
import Validator from "../utils/Validator";
import { renderPurchasedLottos } from "../view/web/PurchasedLottoView";
import { renderLottoResult } from "../view/web/LottoResultView";
import { renderWinningNumInput } from "../view/web/WinningNumInputView";

class WebApp {
  #lottoController;
  #purchaseForm;
  #winningSection;
  #resultModal;

  constructor() {
    this.#lottoController = new LottoController();

    this.#purchaseForm = document.querySelector("#purchase-form");
    this.#winningSection = document.querySelector("#winning-section");
    this.#resultModal = document.querySelector("#result-modal");
  }

  bindEvents() {
    this.#purchaseForm.addEventListener("submit", (e) =>
      this.#purchaseLottos(e),
    );

    this.#winningSection.addEventListener("submit", (e) =>
      this.#showLottoResult(e),
    );

    this.#resultModal.addEventListener("click", (e) => this.#onModalClick(e));
  }

  #purchaseLottos(event) {
    event.preventDefault();
    try {
      const $purchasePriceInput = document.querySelector("#purchase-price");
      const purchasedPrice = Number($purchasePriceInput.value);

      Validator.validatePrice(purchasedPrice);

      const lottoCount = purchasedPrice / LOTTO_PRICE;
      const purchasedLottos = this.#lottoController.issueLottos(lottoCount);

      renderPurchasedLottos(purchasedLottos);
      renderWinningNumInput();

      this.#purchaseForm.reset();
    } catch (error) {
      alert(error.message);
    }
  }

  #showLottoResult(event) {
    event.preventDefault();
    const winningForm = event.target;

    try {
      const formData = new FormData(winningForm);
      const winningNumbers = formData.getAll("winning-number").map(Number);
      const bonusNumber = Number(formData.get("bonus-number"));

      Validator.validateWinningNums(winningNumbers);
      Validator.validateBonusNum(winningNumbers, bonusNumber);

      this.#lottoController.updateWinningResult(winningNumbers, bonusNumber);
      const { rankCount, profitRate } =
        this.#lottoController.getWinningResult();

      renderLottoResult(rankCount, profitRate);
      winningForm.reset();
    } catch (error) {
      alert(error.message);
    }
  }

  #onModalClick(event) {
    const { id } = event.target;

    if (id === "modal-close-btn") {
      this.#resultModal.close();
    }

    if (id === "restart-btn") {
      this.#restartGame();
    }
  }

  #restartGame() {
    document.querySelector("#lotto-count-text").textContent = "";
    document.querySelector("#lotto-list").innerHTML = "";

    this.#winningSection.classList.add("hidden");
    this.#resultModal.close();
  }
}

export default WebApp;
