import LottoPurchaseInput from './LottoPurchaseInput.js';
import LottoDisplay from './LottoDisplay.js';
import Component from '../core/Component.js';
import WinningNumbersInput from './WinningNumbersInput.js';
import RewardModalDisplay from './RewardModalDisplay.js';
import { $ } from '../utils/dom.js';

export default class App extends Component {
  setup() {
    this.states = {
      payment: 0,
      purchaseType: 'auto',
      lottos: [],
      winningCount: {},
      profit: 0,
    };
  }

  execute() {
    this.mountComponent();
  }

  mountComponent() {
    this.lottoPurchaseInput = new LottoPurchaseInput(
      $('#lotto-purchase-input-container'),
    );
    this.lottoDisplay = new LottoDisplay($('#lotto-display-container'));
    this.winningNumbersInput = new WinningNumbersInput(
      $('#lotto-winning-number-input-container'),
    );
    this.modalDisplay = new RewardModalDisplay($('.modal'));
  }

  initRender() {
    this.$target.innerHTML = `
    <div class="d-flex justify-center mt-5">
      <div class="w-100">
        <h1 class="text-center">🎱 행운의 로또</h1>
        <div id="lotto-purchase-input-container" class="mt-5 d-flex flex-col">
        </div>
        <section id="lotto-display-container" class="mt-9 d-none">
        </section>
        <div id="lotto-winning-number-input-container" class="mt-9 d-none">
        </div>
      </div>
    </div>
    <div class="modal"></div>
</div>
    `;
  }
}
