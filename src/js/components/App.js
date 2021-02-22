import LottoPurchaseInput from './LottoPurchaseInput.js';
import LottoDisplay from './LottoDisplay.js';
import LottoManager from '../model/LottoManager.js';
import { $ } from '../utils/dom.js';
import WinningNumbersInput from './WinningNumbersInput.js';
import rewardModalDisplay from './RewardModalDisplay.js';

export default class App {
  constructor() {
    this.$target = $('#app');
    this.setup();
  }

  execute() {
    this.mountComponent();
  }

  setup() {
    this.lottoManager = new LottoManager([]);
  }

  mountComponent() {
    this.lottoPurchaseInput = new LottoPurchaseInput({
      lottoManager: this.lottoManager,
    });

    this.lottoDisplay = new LottoDisplay({ lottoManager: this.lottoManager });
    this.winningNumbersInput = new WinningNumbersInput({
      lottoManager: this.lottoManager,
    });
    this.modalDisplay = new rewardModalDisplay({
      lottoManager: this.lottoManager,
    });
  }
}
