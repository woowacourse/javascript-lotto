import LottoPurchaseInput from './LottoPurchaseInput.js';
import LottoDisplay from './LottoDisplay.js';
import LottoManager from '../model/LottoManager.js';
import WinningNumbersInput from './WinningNumbersInput.js';
import RewardModalDisplay from './RewardModalDisplay.js';
import { $ } from '../utils/dom.js';

export const lottoManager = new LottoManager([]);
export default class App {
  constructor() {
    this.$target = $('#app');
  }

  execute() {
    this.mountComponent();
  }

  mountComponent() {
    this.lottoPurchaseInput = new LottoPurchaseInput();

    this.lottoDisplay = new LottoDisplay();
    this.winningNumbersInput = new WinningNumbersInput();
    this.modalDisplay = new RewardModalDisplay();
  }
}
