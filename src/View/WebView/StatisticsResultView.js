class StatisticsResultView {
  render({ statistics, rate }) {
    const modal = document.querySelector("#modal");
    const html = `
      <div class="ui-modal">
        <div class="modal-container">
          <button class="modal-button" id="modal-close-button">close</button>
          <div class="modal-content">
            <section id="lotto-game-result">
              <div class="ui-content-box">
                <div class="ui-title shape-main align-center">
                  <h1 class="title">🏆 당첨 통계 🏆</h1>
                </div>

                <!-- 당첨 통계 -->
                <div class="ui-table" id="result-staticstic">
                  <table>
                    <summary>당첨 통계</summary>
                    <thead>
                      <tr>
                        <th scope="col" class="align-center">일치 갯수</th>
                        <th scope="col" class="align-center">당첨금</th>
                        <th scope="col" class="align-center">당첨 갯수</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="align-center">3개</td>
                        <td class="align-center">5,000</td>
                        <td class="align-center">${statistics[5]}개</td>
                      </tr>
                      <tr>
                        <td class="align-center">4개</td>
                        <td class="align-center">50,000</td>
                        <td class="align-center">${statistics[4]}개</td>
                      </tr>
                      <tr>
                        <td class="align-center">5개</td>
                        <td class="align-center">1,500,000</td>
                        <td class="align-center">${statistics[3]}개</td>
                      </tr>
                      <tr>
                        <td class="align-center">5개+보너스볼</td>
                        <td class="align-center">30000,000</td>
                        <td class="align-center">${statistics[2]}개</td>
                      </tr>
                      <tr>
                        <td class="align-center">6개</td>
                        <td class="align-center">2,000,000,000</td>
                        <td class="align-center">${statistics[1]}개</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- 수익률 -->
                <p class="ui-info shape-data align-center" id="rate-text">
                  당신의 총 수익률은 ${rate}%입니다.
                </p>

                <div class="ui-button-box">
                  <button class="ui-button variant-primary is-block" id="restart-button">
                    다시 시작하기
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
    modal.innerHTML = html;
  }
  bindEvent(handler) {
    const restartButton = document.querySelector("#restart-button");
    restartButton.addEventListener("click", () => {
      handler();
    });

    const modalCloseButton = document.querySelector("#modal-close-button");
    modalCloseButton.addEventListener("click", () => {
      handler();
    });
  }
  renderReset() {
    const lottoResultBox = document.querySelector("#lotto-result-box");
    lottoResultBox.innerHTML = "";

    const uiModal = document.querySelector("#modal");
    uiModal.innerHTML = "";

    const priceInput = document.querySelector("#price input");
    priceInput.value = "";
  }
}

export default StatisticsResultView;
