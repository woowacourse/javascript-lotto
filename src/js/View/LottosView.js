import View from '../EventListener/View.js';
import FareValue from './FareValue.js';
import { $ } from '../utils/index.js';

export default class LottosView extends View {
  constructor() {
    super(new FareValue());
    this.$lottoCount = $('#lotto-count');
    this.$lottoContainer = $('#lottos-container');
  }

  render(lottos) {
    this.renderDefaultLottoArea(lottos.length);
    this.renderDetailLottoArea(lottos);
    this.$lottoCount.innerText = lottos.length;
  }

  renderDefaultLottoArea(count) {
    this.$lottoContainer.querySelector('.lottos.default').innerHTML =
      '<p class="lotto">🎟️</p>'.repeat(count);
  }

  renderDetailLottoArea(lottos) {
    this.$lottoContainer.querySelector('.lottos.detail').innerHTML = lottos
      .map(
        (lotto) => `<p class="lotto">
          🎟️<span class="lotto-number">${lotto.join(', ')}</span>
      </p>`,
      )
      .join('');
  }

  toggleContainer() {
    this.$lottoContainer.classList.toggle('detail');
  }
}
