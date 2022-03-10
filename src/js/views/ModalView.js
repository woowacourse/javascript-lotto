import { $, $$ } from "../utils/dom";
import { BONUS, SELECTOR } from "../utils/constants";

export default class ModalView {
  constructor() {
    this.modalContainer = $(SELECTOR.MODAL_CONTAINER);
    this.modalProfit = $(SELECTOR.MODAL_PROFIT);
    this.winningCounts = $$(SELECTOR.WINNING_COUNT);
    this.winningBonusCount = $(SELECTOR.WINNING_BONUS_COUNT);
    $(SELECTOR.MODAL_CLOSE).addEventListener("click", this.#handleCloseModal.bind(this));
  }

  bindRestart(handler) {
    $(SELECTOR.MODAL_RESTART).addEventListener("click", handler);
  }

  #handleCloseModal() {
    this.modalContainer.classList.remove("show-modal");
  }

  toggleModal() {
    this.modalContainer.classList.toggle("show-modal");
  }

  renderModal(result, rate) {
    this.modalContainer.classList.add("show-modal");
    this.#renderResult(result);
    this.#renderProfitRate(rate);
  }

  #renderResult(result) {
    this.winningCounts.forEach((winningCount, index) => {
      winningCount.innerText = `${result[index + 3]}개`;
    });
    this.winningBonusCount.innerText = `${result[BONUS]}개`;
  }

  #renderProfitRate(rate) {
    this.modalProfit.innerText = `당신의 총 수익률은 ${rate}%입니다.`;
  }
}
