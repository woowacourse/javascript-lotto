import Validator from "../../Validator.js";

const html = String.raw;

const mockLottos = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
];
const mockPrize = [
  ["3개", 5_000, 1],
  ["4개", 50_000, 0],
  ["5개", 1_500_000, 0],
  ["5개+보너스볼", 30_000_000, 1],
  ["6개", 2_000_000_000, 0],
];
const mockBenefitRate = 62.5;

class MainApp extends HTMLElement {
  #validator;

  #isShowLottos;
  #isOpenModal;

  #purchase;

  constructor() {
    super();

    this.#validator = new Validator();

    this.#isShowLottos = false;
    this.#isOpenModal = false;
    this.#purchase = 0;
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
        <lotto-purchase></lotto-purchase>

        <div class="card-hidden-section" ${this.#isShowLottos ? "" : "hidden"}>
          <!-- 3. 구입 로또 -->
          <div class="lottos-container">
            <div class="lottos-container-header">
              총 ${this.#purchase}개를 구매하셨습니다. <br />
              (로또 수가 많은 경우 스크롤을 내리세요.)
            </div>
            <div class="lottos-table">
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
          <!-- 당첨 번호 & 보너스 번호 입력 폼 -->
          <div class="userLotto-container">
            <label class="userLotto-header" for="">
              지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
            </label>
            <div class="input-container">
              <!-- 당첨 번호 -->
              <div class="winningNumber-container">
                <label class="winningNumber-container-header" for="">
                  당첨 번호
                </label>
                <div class="winningNumber-input-container">
                  <input type="text" class="winningNumber-line" />
                  <input type="text" class="winningNumber-line" />
                  <input type="text" class="winningNumber-line" />
                  <input type="text" class="winningNumber-line" />
                  <input type="text" class="winningNumber-line" />
                  <input type="text" class="winningNumber-line" />
                </div>
              </div>
              <div class="bonusNumber-container">
                <label class="bonusNumber-container-header" for="">
                  당첨 번호
                </label>

                <input type="text" class="bonusNumber-line" />
              </div>
            </div>
          </div>

          <!-- 결과 확인하기 버튼 -->
          <button class="result-button">결과 확인하기</button>
        </div>
      </div>

      <!-- 결과 모달 -->
      <div class="result-modal-overlay" ${this.#isOpenModal ? "" : "hidden"}>
        <div class="modal">
          <button class="modal-close" aria-label="닫기">×</button>

          <div class="modal-header">🏆 당첨 통계 🏆</div>

          <div class="modal-table">
            <div class="row-header">
              <div>일치 갯수</div>
              <div>당첨금</div>
              <div>당첨 갯수</div>
            </div>
            <!-- 표 영역 -->
            ${mockPrize
              .map(
                (prize) =>
                  html`<div class="row">
                    <div class="row-item">${prize[0]}</div>
                    <div class="row-item">
                      ${prize[1].toLocaleString("ko-KR")}
                    </div>
                    <div class="row-item">${prize[2]}개</div>
                  </div>`
              )
              .join("")}
          </div>

          <!-- 수익률 -->
          <div class="benefit-messege">
            당신의 총 수익률은 ${mockBenefitRate}%입니다.
          </div>

          <button class="modal-restart">다시 시작하기</button>
        </div>
      </div>
    </div>`;

    this.querySelector("lotto-purchase").addEventListener(
      "purchase",
      (event) => {
        const { purchase } = event.detail;

        this.#validator.validatePrice(purchase);
        this.#purchase = purchase / 1000;

        this.#isShowLottos = true;
        this.render();
      }
    );

    this.querySelector(".result-button").addEventListener("click", () => {
      this.#isOpenModal = true;
      this.render();
    });
    this.querySelector(".modal-close").addEventListener("click", () => {
      this.#isOpenModal = false;
      this.render();
    });
  }
}

customElements.define("lotto-main", MainApp);
