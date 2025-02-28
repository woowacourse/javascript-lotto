import LottoMachine from '../../../common/domains/LottoMachine.js';
import PurchaseForm from '../PurchaseForm/PurchaseForm.js';
import LottoList from '../LottoList/LottoList.js';
import WinningInputsForm from '../WinningInputsForm/WinningInputsForm.js';
import WinningResultModal from '../WinningResultModal/WinningResultModal.js';
import ViewComponent from '../core/ViewComponent.js';
import {
  EVENT_TYPES,
  SELECTORS,
} from '../../../common/constants/MainConstants.js';

class Main extends ViewComponent {
  #lottoMachine;

  constructor(selector) {
    const $container = document.querySelector(selector);
    super($container);
    this.#bindEvents();
  }

  render() {
    this.#renderDashboardLayout();
    this.#renderPurchaseForm();
    this.#renderLottoList();
    this.$winningResultModal = new WinningResultModal();
  }

  #template() {
    return `
      <div class="dashboard">
        <h1>🎱 내 번호 당첨 확인 🎱</h1>
        <div class="purchase-price-area"></div>
        <div class="lottos-area"></div>
        <div class="winning-inputs-area"></div>
      </div>
    `;
  }

  // 내부에서만 사용하는 렌더링 관련 메서드들을 프라이빗으로 전환합니다.
  #renderDashboardLayout() {
    this.$container.innerHTML = this.#template();
  }

  #renderPurchaseForm() {
    const $purchasePriceArea = this.$container.querySelector(
      SELECTORS.PURCHASE_PRICE_AREA,
    );
    this.$purchaseForm = new PurchaseForm($purchasePriceArea);
  }

  #renderLottoList() {
    const $lottosArea = this.$container.querySelector(SELECTORS.LOTTOS_AREA);
    this.$lottoList = new LottoList($lottosArea);
  }

  #renderWinningInputsForm() {
    const $winningInputsArea = this.$container.querySelector(
      SELECTORS.WINNING_INPUTS_AREA,
    );
    this.$winningInputsForm = new WinningInputsForm($winningInputsArea);
  }

  // 외부에서 이벤트 바인딩 호출 시 내부의 프라이빗 메서드들을 사용합니다.
  #bindEvents() {
    this.#bindPurchaseLottosEvent();
    this.#bindCalculateResultEvent();
    this.#bindRestartEvent();
  }

  #bindPurchaseLottosEvent() {
    this.$container.addEventListener(EVENT_TYPES.PURCHASE_LOTTOS, (e) => {
      const purchasePrice = e.detail;
      this.#lottoMachine = new LottoMachine(purchasePrice);
      this.$lottoList.render(this.#lottoMachine.lottos);
      this.#renderWinningInputsForm();
    });
  }

  #bindCalculateResultEvent() {
    this.$container.addEventListener(EVENT_TYPES.CALCULATE_RESULT, (e) => {
      const { winningNumbers, bonusNumber } = e.detail;
      const [winningCounts, profitRate] = this.#lottoMachine.calculateResult(
        winningNumbers,
        bonusNumber,
      );
      this.$winningResultModal.render(winningCounts, profitRate);
    });
  }

  #bindRestartEvent() {
    this.$container.addEventListener(EVENT_TYPES.RESTART, () => {
      this.render();
      this.#bindEvents();
    });
  }
}

export default Main;
