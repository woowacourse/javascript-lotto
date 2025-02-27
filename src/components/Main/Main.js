// Main.js
import LottoMachine from '../../domains/LottoMachine.js';
import PurchaseForm from '../PurchaseForm/PurchaseForm.js';
import LottoList from '../LottoList/LottoList.js';
import WinningInputsForm from '../WinningInputsForm/WinningInputsForm.js';
import WinningResultModal from '../WinningResultModal/WinningResultModal.js';
import ViewComponent from '../core/ViewComponent.js';

class Main extends ViewComponent {
  constructor(selector) {
    const container = document.querySelector(selector);
    super(container);
  }

  render() {
    this.renderDashboardLayout();
    this.renderPurchaseForm();
    this.renderLottoList();
    this.winningResultModal = new WinningResultModal();
  }

  template() {
    return `
      <div class="dashboard">
        <h1>🎱 내 번호 당첨 확인 🎱</h1>
        <div class="purchase-price-area"></div>
        <div class="lottos-area"></div>
        <div class="winning-inputs-area"></div>
      </div>
    `;
  }

  renderDashboardLayout() {
    this.container.innerHTML = this.template();
  }

  renderPurchaseForm() {
    const purchasePriceArea = this.container.querySelector(
      '.purchase-price-area',
    );
    this.purchaseForm = new PurchaseForm(purchasePriceArea);
  }

  renderLottoList() {
    const lottosArea = this.container.querySelector('.lottos-area');
    this.lottoList = new LottoList(lottosArea);
  }

  renderWinningInputsForm() {
    const winningInputsArea = this.container.querySelector(
      '.winning-inputs-area',
    );
    this.WinningInputsForm = new WinningInputsForm(winningInputsArea);
  }

  bindEvents() {
    this.bindPurchaseLottosEvent();
    this.bindCalculateResultEvent();
    this.bindRestartEvent();
  }

  bindPurchaseLottosEvent() {
    this.container.addEventListener('purchaseLottos', (e) => {
      this.purchasePrice = e.detail;
      this.lottoMachine = new LottoMachine(this.purchasePrice);
      this.lottoList.render(this.lottoMachine.lottos);
      this.renderWinningInputsForm();
    });
  }

  bindCalculateResultEvent() {
    this.container.addEventListener('calculateResult', (e) => {
      const { winningNumbers, bonusNumber } = e.detail;
      const [winningCounts, profitRate] = this.lottoMachine.calculateResult(
        winningNumbers,
        bonusNumber,
      );
      this.winningResultModal.renderModal(winningCounts, profitRate);
    });
  }

  bindRestartEvent() {
    this.container.addEventListener('restart', () => {
      this.render();
      this.bindEvents();
    });
  }
}

export default Main;
