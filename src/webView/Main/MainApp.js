import Validator from "../../Validator.js";
import LottoList from "../../Model/LottoList.js";
import LottoGame from "../../Model/LottoGame.js";
import Rate from "../../Model/Rate.js";

const html = String.raw;

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
        <lotto-statistics-modal></lotto-statistics-modal>
      </div>
    </div>`;

    const lottosEl = this.querySelector("lotto-lottos");
    if (lottosEl && this.#lottoList) {
      lottosEl.lottoList = this.#lottoList;
    }
    const modalEl = this.querySelector("lotto-statistics-modal");
    if (modalEl) {
      modalEl.open = this.#isOpenModal;
      modalEl.statistics = this.#statistics;
      modalEl.rate = this.#rate;
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
    this.querySelector("lotto-statistics-modal").addEventListener(
      "close",
      () => {
        this.#isOpenModal = false;
        this.render();
      }
    );
    this.querySelector("lotto-statistics-modal").addEventListener(
      "restart",
      () => {
        this.#isShowLottos = false;
        this.#isOpenModal = false;
        this.render();
      }
    );
  }
}

customElements.define("lotto-main", MainApp);
