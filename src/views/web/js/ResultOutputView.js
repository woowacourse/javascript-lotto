class ResultOutputView {
  #section;
  #handler;

  constructor(handleRestartButton) {
    this.#handler = handleRestartButton;
  }

  render() {
    this.#section = document.querySelector("#result");

    this.#section.innerHTML = `
          <div class="result__background">
            <div class="result__container">
              <button class="result__close-button">
                ✕
              </button>
              <h3 class="result__title">🏆 당첨 통계 🏆</h3>
              <table class="result__table">
                <thead class="result__table-head">
                  <tr class="result__table-row">
                    <th>일치 갯수</th>
                    <th>당첨금</th>
                    <th>당첨 갯수</th>
                  </tr>
                </thead>
                <tbody class="result__table-body">
                  <tr class="result__table-row">
                    <td>3개</td>
                    <td>5,000</td>
                    <td id="count-3">0개</td>
                  </tr>
                  <tr class="result__table-row">
                    <td>4개</td>
                    <td>50,000</td>
                    <td id="count-4">0개</td>
                  </tr>
                  <tr class="result__table-row">
                    <td>5개</td>
                    <td>1,500,000</td>
                    <td id="count-5">0개</td>
                  </tr>
                  <tr class="result__table-row">
                    <td>5개 + 보너스</td>
                    <td>30,000,000</td>
                    <td id="count-5b">0개</td>
                  </tr>
                  <tr class="result__table-row">
                    <td>6개</td>
                    <td>2,000,000,000</td>
                    <td id="count-6">0개</td>
                  </tr>
                </tbody>
              </table>
              <p class="result__profit">당신의 총 수익률은 <span id="profit-rate">0</span>%입니다.</p>
              <button class="result__restart-button">다시 시작하기</button>
            </div>
          </div>`;

    this.#addEventListener();
  }

  #addEventListener() {
    const closeButton = this.#section.querySelector(".result__close-button");
    const restartButton = this.#section.querySelector(".result__restart-button");

    closeButton.addEventListener("click", () => this.#close());
    restartButton.addEventListener("click", () => {
      this.#close();
      this.#handler();
    });
  }

  #close() {
    this.#section.style.display = "none";
  }

  #open() {
    this.#section.style.display = "block";
  }

  renderResult(resultData, profitRate) {
    this.#open();

    this.#section.querySelector("#count-3").textContent = `${resultData[0].count}개`;
    this.#section.querySelector("#count-4").textContent = `${resultData[1].count}개`;
    this.#section.querySelector("#count-5").textContent = `${resultData[2].count}개`;
    this.#section.querySelector("#count-5b").textContent = `${resultData[3].count}개`;
    this.#section.querySelector("#count-6").textContent = `${resultData[4].count}개`;

    this.#section.querySelector("#profit-rate").textContent = profitRate;
  }
}

export default ResultOutputView;
