import { SELECTOR } from "../utils/constants";
import { $ } from "../utils/dom";

export default class ModalView {
  constructor(setClickRestart) {
    this.setClickRestart = setClickRestart;
    this.modalContainer = $(SELECTOR.MODAL_CONTAINER);
    this.modalTableBody = $(SELECTOR.MODAL_TABLE_BODY);
    this.modalProfit = $(SELECTOR.MODAL_PROFIT);

    $(SELECTOR.MODAL_CLOSE).addEventListener("click", this.onClickCloseModal.bind(this));
    $(SELECTOR.MODAL_RESTART).addEventListener("click", this.onClickRestart.bind(this));
  }

  onClickCloseModal() {
    this.modalContainer.classList.remove("show-modal");
  }

  onClickRestart() {
    this.onClickCloseModal();
    this.setClickRestart();
  }

  renderModal(result, rate) {
    this.modalContainer.classList.add("show-modal");
    this.#renderResult(result);
    this.#renderProfitRate(rate);
  }

  #renderResult(result) {
    this.modalTableBody.replaceChildren();
    this.modalTableBody.insertAdjacentHTML(
      "beforeend",
      Object.keys(result)
        .map(
          (key) =>
            `<tr>
                <td>${key}</td>
                <td>${result[key][0].toLocaleString()}</td>
                <td>${result[key][1]}개</td>
            </tr>`,
        )
        .join(""),
    );
  }

  #renderProfitRate(rate) {
    this.modalProfit.innerText = `당신의 총 수익률은 ${rate}%입니다.`;
  }
}
