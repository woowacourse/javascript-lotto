import Validator from "../../Validator.js";
import LottoList from "../../Model/LottoList.js";
import LottoGame from "../../Model/LottoGame.js";
import Rate from "../../Model/Rate.js";

const html = String.raw;

const prizeTable = [
  { label: "3개", prize: 5_000, grade: 5 },
  { label: "4개", prize: 50_000, grade: 4 },
  { label: "5개", prize: 1_500_000, grade: 3 },
  { label: "5개+보너스볼", prize: 30_000_000, grade: 2 },
  { label: "6개", prize: 2_000_000_000, grade: 1 },
];

class MainApp extends HTMLElement {
  #validator;

  #isShowLottos;
  #isOpenModal;

  #purchaseAmount;
  #purchaseError;

  #lottoList;
  #lottoGame;
  #winningError;

  #statistics;
  #rate;

  constructor() {
    super();

    this.#validator = new Validator();

    this.#isShowLottos = false;
    this.#isOpenModal = false;

    this.#purchaseAmount = 0;
    this.#purchaseError = "";
    this.#winningError = "";
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
        <lotto-purchase error="${this.#purchaseError}"></lotto-purchase>

        <div class="card-hidden-section" ${this.#isShowLottos ? "" : "hidden"}>
          <!-- 3. 구입 로또 -->
          <lotto-lottos></lotto-lottos>

          <!-- 4. 당첨 번호 & 보너스 번호 입력 폼 -->
          <lotto-user-lotto error="${this.#winningError}"></lotto-user-lotto>
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
              ${prizeTable
                .map(
                  (row) =>
                    html`<div class="row">
                      <div class="row-item">${row.label}</div>
                      <div class="row-item">
                        ${row.prize.toLocaleString("ko-KR")}
                      </div>
                      <div class="row-item">
                        ${this.#statistics ? this.#statistics[row.grade] : 0}개
                      </div>
                    </div>`
                )
                .join("")}
            </div>

            <!-- 수익률 -->
            <div class="benefit-messege">
              당신의 총 수익률은
              ${this.#rate ? this.#rate.getRate() : 0}%입니다.
            </div>

            <button class="modal-restart">다시 시작하기</button>
          </div>
        </div>
      </div>
    </div>`;

    const lottosEl = this.querySelector("lotto-lottos");
    if (lottosEl && this.#lottoList) {
      lottosEl.lottoList = this.#lottoList;
    }

    this.querySelector("lotto-purchase").addEventListener(
      "purchase",
      (event) => {
        this.#isShowLottos = false;

        try {
          const { purchase } = event.detail;

          this.#validator.validatePrice(purchase);
          this.#purchaseAmount = purchase / 1000;
          this.#purchaseError = "";

          this.#lottoList = new LottoList(this.#purchaseAmount);

          this.#isShowLottos = true;
        } catch (error) {
          this.#purchaseError = error.message;
        }

        this.render();
      }
    );

    this.querySelector("lotto-user-lotto").addEventListener(
      "result",
      (event) => {
        this.#isOpenModal = false;

        try {
          const { winningNumber, bonusNumber } = event.detail;

          this.#validator.validateLottoNumbers(winningNumber);
          this.#validator.validateBonusNumber(winningNumber, bonusNumber);

          this.#winningError = "";

          this.#lottoGame = new LottoGame(winningNumber, bonusNumber);
          this.#statistics = this.#lottoGame.calculateStatistics(
            this.#lottoList
          );

          this.#rate = new Rate(this.#statistics, this.#purchaseAmount * 1000);

          this.#isOpenModal = true;
        } catch (error) {
          this.#winningError = error.message;
        }
        this.render();
      }
    );
    this.querySelector(".modal-close").addEventListener("click", () => {
      this.#isOpenModal = false;
      this.#isShowLottos = false;
      this.render();
    });
  }
}

customElements.define("lotto-main", MainApp);
