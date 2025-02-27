// Main.js
import LottoMachine from '../domains/LottoMachine.js';
import PurchaseForm from './PurchaseForm.js';
import LottoList from './LottoList.js';
import WinningInputsForm from './WinningInputsForm.js';

class Main {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.render();
    this.bindEvents();
  }

  render() {
    // 대시보드 기본 레이아웃 렌더링
    this.container.innerHTML = `
      <div class="dashboard">
        <h1>🎱 내 번호 당첨 확인 🎱</h1>
        <div class="purchase-price-area"></div>
        <div class="lottos-area"></div>
        <div class="winning-inputs-area"></div>
      </div>
    `;
    // PurchaseForm 컴포넌트를 dashboard 내부에 추가
    const purchasePriceArea = this.container.querySelector(
      '.purchase-price-area',
    );
    this.purchaseForm = new PurchaseForm(purchasePriceArea);
    // LottoList 컴포넌트를 lottos-area에 생성
    const lottosArea = this.container.querySelector('.lottos-area');
    this.lottoList = new LottoList(lottosArea);
    const winningInputsArea = this.container.querySelector(
      '.winning-inputs-area',
    );
    this.winningInputsForm = new WinningInputsForm(winningInputsArea);
  }

  bindEvents() {
    // purchaseLottos 이벤트 수신 시 LottoMachine을 통해 로또 생성 후 LottoList 렌더링
    this.container.addEventListener('purchaseLottos', (e) => {
      this.purchasePrice = e.detail;
      this.lottoMachine = new LottoMachine(this.purchasePrice);
      this.lottoList.render(this.lottoMachine.lottos);
      this.winningInputsForm.render();
      this.winningInputsForm.bindEvents();
    });

    this.container.addEventListener('calculateResult', (e) => {
      const { winningNumbers, bonusNumber } = e.detail;
      const [winningCounts, profitRate] = this.lottoMachine.calculateResult(
        winningNumbers,
        bonusNumber,
      );
      alert(winningCounts, profitRate);
    });
  }
}

export default Main;
