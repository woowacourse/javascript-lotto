import { PRIZE } from "../constants";

class ModalView {
  constructor() {
    this.modal = document.querySelector(".modal");
    this.modalTable = document.querySelector(".modal-table");
    this.profit = document.querySelector(".profit");
    this.closeButton = document.querySelector(".modal-close-button");
    this.restartButton = document.querySelector(".restart-btn");
  }

  showResult(result) {
    this.modal.style.display = "flex";
    this.modalTable.innerHTML += `<th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 갯수</th>`;
    PRIZE.map((amount, idx) => {
      const tr = `<tr>
        <td>${5 - idx}등</td>
        <td>${amount.toLocaleString()}</td>
        <td>${result[idx]}개</td>
      </tr>`;
      this.modalTable.innerHTML += tr;
    });
    this.profit.innerText = `당신의 총 수익률은 ${result[
      result.length - 1
    ].toLocaleString()}%입니다.`;
  }
}

export default ModalView;
