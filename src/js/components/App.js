import LottoPurchaseInput from './LottoPurchaseInput.js';
import LottoDisplay from './LottoDisplay.js';
import WinningNumbersInput from './WinningNumbersInput.js';
import RewardModalDisplay from './RewardModalDisplay.js';
import LottoManager from '../model/LottoManager.js';
import { $ } from '../utils/dom.js';

export const lottoManager = new LottoManager([]);
export default class App {
  execute() {
    this.selectDOM();
    this.mountComponent();
  }

  selectDOM() {
    this.$target = $('#app');
  }

  mountComponent() {
    this.lottoPurchaseInput = new LottoPurchaseInput();
    this.lottoDisplay = new LottoDisplay();
    this.winningNumbersInput = new WinningNumbersInput();
    this.modalDisplay = new RewardModalDisplay();
  }
}
