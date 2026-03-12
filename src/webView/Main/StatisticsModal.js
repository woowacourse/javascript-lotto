const html = String.raw;

const prizeTable = [
  { label: "3개", prize: 5_000, grade: 5 },
  { label: "4개", prize: 50_000, grade: 4 },
  { label: "5개", prize: 1_500_000, grade: 3 },
  { label: "5개+보너스볼", prize: 30_000_000, grade: 2 },
  { label: "6개", prize: 2_000_000_000, grade: 1 },
];

class StatisticsModal extends HTMLElement {
  set open(value) {
    this._open = Boolean(value);
    this.render();
  }

  set statistics(value) {
    this._statistics = value;
    this.render();
  }

  set rate(value) {
    this._rate = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const statistics = this._statistics ?? {};
    const rateValue = this._rate ? this._rate.getRate() : 0;

    this.innerHTML = html`<div
      class="result-modal-overlay"
      ${this._open ? "" : "hidden"}
    >
      <div class="modal">
        <button class="modal-close" aria-label="닫기">×</button>

        <div class="modal-header">🏆 당첨 통계 🏆</div>

        <div class="modal-table">
          <div class="row-header">
            <div>일치 갯수</div>
            <div>당첨금</div>
            <div>당첨 갯수</div>
          </div>
          ${prizeTable
            .map(
              (row) =>
                html`<div class="row">
                  <div class="row-item">${row.label}</div>
                  <div class="row-item">
                    ${row.prize.toLocaleString("ko-KR")}
                  </div>
                  <div class="row-item">${statistics[row.grade] ?? 0}개</div>
                </div>`
            )
            .join("")}
        </div>

        <div class="benefit-messege">
          당신의 총 수익률은 ${rateValue.toLocaleString("ko-KR")}%입니다.
        </div>

        <button class="modal-restart">다시 시작하기</button>
      </div>
    </div>`;

    this.querySelector(".modal-close").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
    });
    this.querySelector(".modal-restart").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("restart", { bubbles: true }));
    });
  }
}

customElements.define("lotto-statistics-modal", StatisticsModal);
