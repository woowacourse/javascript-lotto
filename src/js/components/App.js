import LottoPurchaseInput from './LottoPurchaseInput.js';
import LottoDisplay from './LottoDisplay.js';
import Lotto from '../model/Lotto.js';

import { $ } from '../utils/dom.js';
import { generateLottoNumbers } from '../utils/lotto.js';

export default class App {
  constructor() {
    this.$target = $('#app');
  }

  execute() {
    this.initState();
    this.mountComponent();
  }

  initState() {
    this.lottos = [];
  }

  mountComponent() {
    this.lottoPurchaseInput = new LottoPurchaseInput({
      createLottos: this.createLottos.bind(this),
    });

    this.lottoDisplay = new LottoDisplay({ lottos: this.lottos });
  }

  createLottos(lottoCount) {
    const lottos = Array.from(
      { length: lottoCount },
      () => new Lotto(generateLottoNumbers()),
    );

    this.setState({ lottos });
  }

  setState({ lottos }) {
    this.lottos = lottos;
    this.lottoDisplay.setState({ lottos: this.lottos });
  }
}
