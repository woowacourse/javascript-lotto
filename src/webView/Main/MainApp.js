const html = String.raw;

const mockLottoCount = 3;
const mockLottos = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
];

class MainApp extends HTMLElement {
  #isShowLottos;

  constructor() {
    super();
    this.#isShowLottos = false;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = html`<div class="main-container">
      <div class="card-container">
        <!-- 1. 헤더 -->
        <div class="card-header">🎱 내 번호 당첨 확인 🎱</div>

        <!--  2. 구입 금액 입력 폼 -->
        <div class="card-input-container">
          <label class="input-label" for="purchase-amount">
            구입할 금액을 입력해주세요.
          </label>
          <div class="input-container">
            <input class="input-line" id="purchase-amount" placeholder="금액" />
            <button class="input-button">구입</button>
          </div>
        </div>

        <!-- 3. 로또 및 로또 번호 & 보너스 번호 입력 폼 -->
        <div class="card-hidden-section" ${this.#isShowLottos ? "" : "hidden"}>
          <div class="lottos-container">
            <div class="lottos-container-header">
              총 ${mockLottoCount}개를 구매하셨습니다.
            </div>
            ${mockLottos
              .map(
                (lotto) =>
                  // <!-- 하나의 로또 라인 -->
                  html`<div class="lotto-line">
                    <div class="lotto-line-icon">🎟️</div>
                    ${lotto.join(", ")}
                  </div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>`;

    this.querySelector(".input-button").addEventListener("click", () => {
      this.#isShowLottos = true;
      this.render();
    });
  }
}

customElements.define("lotto-main", MainApp);
