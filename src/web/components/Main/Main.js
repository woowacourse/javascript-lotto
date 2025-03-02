import LottoMachine from '../../../common/domains/LottoMachine.js';
import PurchaseForm from '../PurchaseForm/PurchaseForm.js';
import LottoList from '../LottoList/LottoList.js';
import WinningInputsForm from '../WinningInputsForm/WinningInputsForm.js';
import WinningResultModal from '../WinningResultModal/WinningResultModal.js';
import ViewComponent from '../core/ViewComponent.js';
import {
  EVENT_TYPES,
  MAIN_SELECTORS,
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
        <form class="purchase-price-area"></form>
        <div class="lottos-area"></div>
        <form class="winning-inputs-area"></form>
      </div>
    `;
  }

  #renderDashboardLayout() {
    this.$container.innerHTML = this.#template();
  }

  #renderPurchaseForm() {
    const $purchasePriceArea = this.$container.querySelector(
      MAIN_SELECTORS.PURCHASE_PRICE_AREA,
    );
    this.$purchaseForm = new PurchaseForm($purchasePriceArea);
  }

  #renderLottoList() {
    const $lottosArea = this.$container.querySelector(
      MAIN_SELECTORS.LOTTOS_AREA,
    );
    this.$lottoList = new LottoList($lottosArea);
  }

  #renderWinningInputsForm() {
    const $winningInputsArea = this.$container.querySelector(
      MAIN_SELECTORS.WINNING_INPUTS_AREA,
    );
    this.$winningInputsForm = new WinningInputsForm($winningInputsArea);
  }

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
