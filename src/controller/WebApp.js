import { LOTTO_PRICE } from "../constants/lottoInfo";
import LottoController from "./LottoController";
import Validator from "../utils/Validator";
import { renderLottoTicket } from "../view/web/LottoPurchaseView";
import { renderLottoResult } from "../view/web/LottoResultView";
import { renderWinningInput } from "../view/web/LottoWinningView";

class WebApp {
  #lottoController;
  #purchaseForm;
  #winningWrapper;
  #resultModal;

  constructor() {
    this.#lottoController = new LottoController();

    this.#purchaseForm = document.querySelector("#purchase-form");
    this.#winningWrapper = document.querySelector("#winning-input-wrapper");
    this.#resultModal = document.querySelector("#result-modal");
  }

  initEvents() {
    this.#purchaseForm.addEventListener("submit", (e) =>
      this.#handlePurchase(e),
    );

    this.#winningWrapper.addEventListener("submit", (e) =>
      this.#handleWinningResult(e),
    );

    this.#resultModal.addEventListener("click", (e) =>
      this.#handleModalClick(e),
    );
  }

  #handlePurchase(event) {
    event.preventDefault();
    try {
      const $purchasePriceInput = document.querySelector("#purchase-price");
      const purchasedPrice = Number($purchasePriceInput.value);

      Validator.validatePrice(purchasedPrice);

      const lottoCount = purchasedPrice / LOTTO_PRICE;
      const purchasedLottos = this.#lottoController.issueLottos(lottoCount);

      renderLottoTicket(purchasedLottos);
      renderWinningInput();

      this.#purchaseForm.reset();
    } catch (error) {
      alert(error.message);
    }
  }

  #handleWinningResult(event) {
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

  #handleModalClick(event) {
    const { id } = event.target;

    if (id === "modal-close-btn") {
      this.#resultModal.close();
    }

    if (id === "restart-button") {
      this.#handleRestart();
    }
  }

  #handleRestart() {
    this.#lottoController.reset();

    document.querySelector("#lotto-count-text").textContent = "";
    document.querySelector("#lotto-list").innerHTML = "";

    this.#winningWrapper.classList.add("hidden");
    this.#resultModal.close();
  }
}

export default WebApp;
