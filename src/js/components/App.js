import Lotto from '../model/Lotto.js';
import { $ } from '../utils/dom.js';
import { generateLottoNumbers } from '../utils/lotto.js';
import LottoDisplay from './LottoDisplay.js';
import LottoPerchaseInput from './LottoPerchaseInput.js';

export default class App {
  constructor() {
    this.$target = $('#app');
    this.initState();
    this.mountComponent();
  }

  initState() {
    this.lottos = [];
  }

  setState({ lottos }) {
    this.lottos = lottos;
    this.lottoDisplay.setState({ lottos: this.lottos });
  }

  mountComponent() {
    this.lottoPerchaseInput = new LottoPerchaseInput({
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
}
