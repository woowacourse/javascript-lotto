import LottoPurchaseInput from './LottoPurchaseInput.js';
import LottoDisplay from './LottoDisplay.js';
import LottoManager from '../model/LottoManager.js';
import { $ } from '../utils/dom.js';

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
  }
}
