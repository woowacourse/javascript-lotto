import { PRIZE } from "../../constants";

class ModalView {
  constructor(handleCloseModal, handleRestartGame) {
    this.modal = document.querySelector(".modal");
    this.modalTable = document.querySelector(".modal-table");
    this.profit = document.querySelector(".profit");
    document
      .querySelector(".modal-close-btn")
      .addEventListener("click", handleCloseModal);
    document
      .querySelector(".restart-btn")
      .addEventListener("click", handleRestartGame);
  }

  showResult(result) {
    this.modal.style.display = "flex";
    this.modalTable.innerHTML += `<th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 갯수</th>`;
    PRIZE.map((amount, idx) => {
      const tr = `<tr>
        <td>${this.showMatchedCount(idx)}</td>
        <td>${amount.toLocaleString()}</td>
        <td>${result[idx]}개</td>
      </tr>`;
      this.modalTable.innerHTML += tr;
    });
    this.profit.textContent = `당신의 총 수익률은 ${result[result.length - 1]
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%입니다.`;
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
}

export default ModalView;
