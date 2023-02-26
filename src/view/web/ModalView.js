import { PRIZE } from "../../constants";

class ModalView {
  constructor(handleRestartGame) {
    this.modal = document.querySelector(".modal");
    this.modalOverlay = document.querySelector(".modal-overlay");
    this.modalWindow = document.querySelector(".modal-window");
    this.modalTable = document.querySelector(".modal-table");
    this.profit = document.querySelector(".profit");
    this.restartBtn = document.querySelector(".restart-btn");
    this.closeBtn = document.querySelector(".modal-close-btn");
    this.handleCloseModalEscape();
    this.handleCloseModalOverlay();
    this.handleCloseButton();
    this.handleRestartLottoGame(handleRestartGame);
  }

  showModal() {
    this.modal.style.display = "flex";
  }

  showResult(result) {
    this.showModal();
    this.restartBtn.focus();
    const resultTableHeader = `<th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 갯수</th>`;
    const resultTable =
      resultTableHeader + this.makeResultTable(result).join("");
    this.modalTable.insertAdjacentHTML("beforeend", resultTable);
    this.profit.textContent = `당신의 총 수익률은 ${result[result.length - 1]
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%입니다.`;
  }

  makeResultTable(result) {
    return PRIZE.map(
      (amount, idx) =>
        `<tr>
        <td>${this.showMatchedCount(idx)}</td>
        <td>${amount.toLocaleString()}</td>
        <td>${result[idx]}개</td>
      </tr>`
    );
  }

  showMatchedCount(idx) {
    if (idx < 3) return idx + 3 + "개";
    if (idx === 3) return idx + 2 + "개+보너스볼";
    return idx + 2 + "개";
  }

  hiddenModal() {
    this.modal.style.display = "none";
    this.modalTable.innerHTML = "";
  }

  closeModalEscape(event) {
    if (this.modal.style.display === "flex" && event.key === "Escape") {
      this.hiddenModal();
    }
  }

  closeModalOverlay(event) {
    if (event.target.classList.contains("modal-overlay")) {
      this.hiddenModal();
    }
  }

  handleCloseButton() {
    this.closeBtn.addEventListener("click", () => {
      this.hiddenModal();
    });
  }

  handleCloseModalEscape() {
    window.addEventListener("keyup", (e) => {
      this.closeModalEscape(e);
    });
  }

  handleCloseModalOverlay() {
    this.modal.addEventListener("click", (e) => {
      this.closeModalOverlay(e);
    });
  }

  handleRestartLottoGame(handleRestartGame) {
    this.restartBtn.addEventListener("click", handleRestartGame);
  }
}

export default ModalView;
