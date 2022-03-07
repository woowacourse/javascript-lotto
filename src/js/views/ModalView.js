import { BONUS, REWARD, SELECTOR } from "../utils/constants";
import { $, $$ } from "../utils/dom";

export default class ModalView {
  constructor(setClickRestart) {
    this.setClickRestart = setClickRestart;
    this.modalContainer = $(SELECTOR.MODAL_CONTAINER);
    this.modalProfit = $(SELECTOR.MODAL_PROFIT);
    this.winningCounts = $$(SELECTOR.WINNING_COUNT);
    this.winningBonusCount = $(SELECTOR.WINNING_BONUS_COUNT);

    $(SELECTOR.MODAL_CLOSE).addEventListener("click", this.#handleCloseModal.bind(this));
    $(SELECTOR.MODAL_RESTART).addEventListener("click", this.#handleRestart.bind(this));
  }

  #handleCloseModal() {
    this.modalContainer.classList.remove("show-modal");
  }

  #handleRestart() {
    this.#handleCloseModal();
    this.setClickRestart();
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
