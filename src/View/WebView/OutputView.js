import Console from "../../utils/Console.js";
import { AMOUNT_PRICE } from "../../constants/lottoConstants.js";

export class OutputView {
  renderApp() {
    const app = document.querySelector("#app");
    const html = `
      <div class="layout">
        <header class="header">
          <h1 class="logo">
            <a href="/">🎱 행운의 로또</a>
          </h1>
        </header>
        <main class="main">
          <section
            id="lotto-game-main"
            class="ui-content-box is-line width-fixed"
          >
            <div class="ui-title shape-main align-center">
              <h1 class="title">🎱 내 번호 당첨 확인 🎱</h1>
            </div>

            <!-- 금액 입력 -->
            <div class="ui-form-group">
              <div class="form-group-title">구입할 금액을 입력해주세요.</div>
              <div class="form-group-content">
                <div class="ui-input is-block" id="price">
                  <input placeholder="금액" />
                </div>
                <button class="ui-button variant-primary" id="buy-button">
                  구입
                </button>
              </div>
            </div>

            <div id="lotto-result-box"></div>

          </section>
        </main>
        <footer class="footer">
          <p class="copy-right">Copyright 2023. woowacourse</p>
        </footer>
      </div>
    `;

    app.innerHTML = html;
  }
  renderLottoResult({ amount, lottoList }) {
    const lottoResultBox = document.querySelector("#lotto-result-box");
    const html = `
            <!-- 구매한 로또 -->
            <div class="ui-title shape-content">
              <h2 class="title" id="amount-text">총 ${amount}개를 구매하였습니다.</h2>
            </div>
            <ul class="ui-list" id="lotto-list">
            ${lottoList
              .getLottoList()
              .map((lotto) => {
                const lottoNumbers = lotto.getNumbers();
                return `<li>🎟️ ${lottoNumbers.join(", ")}</li>`;
              })
              .join("")}
            </ul>


            <!-- 당첨번호, 보너스 번호 입력 -->
            <div class="ui-title shape-content">
              <h2 class="title">
                지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
              </h2>
            </div>

            <div class="ui-form-cluster">
              <!-- 당첨번호 -->
              <div class="ui-form-group">
                <div class="form-group-title">당첨 번호</div>
                <div class="form-group-content">
                  <div class="ui-pin-root" id="winning-lottos">
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 보너스 번호 -->
              <div class="ui-form-group align-right">
                <div class="form-group-title">보너스 번호</div>
                <div class="form-group-content">
                  <div class="ui-pin-root">
                    <div class="ui-pin" id="bonus-lotto">
                      <input placeholder="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 확인하기 버튼 -->
            <div class="ui-button-box">
              <button
                class="ui-button variant-primary is-block"
                id="result-button"
              >
                결과 확인하기
              </button>
            </div>
    `;
    lottoResultBox.innerHTML = html;
  }
  renderStatisticsResult({ statistics, rate }) {
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
  printReset() {
    const lottoResultBox = document.querySelector("#lotto-result-box");
    lottoResultBox.innerHTML = "";

    const uiModal = document.querySelector("#modal");
    uiModal.innerHTML = "";

    const priceInput = document.querySelector("#price input");
    priceInput.value = "";
  }
  printError(errorMessage) {
    Console.print(`${errorMessage} 다시 입력해주세요.`);
  }
}

export default OutputView;
