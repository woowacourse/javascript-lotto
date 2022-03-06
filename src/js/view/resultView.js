import { $, $$ } from '../utils/selector';
import makeTemplate from './template';

export default class ResultView {
  constructor() {
    this.$result = $('#result');
  }

  bindResultButtonEvent(callback) {
    this.$result.addEventListener('submit', callback.bind(this));
  }

  renderResult(count) {
    this.$result.replaceChildren();
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeResultTemplate(count));
  }

  renderLottos(lottos) {
    const $lottos = $$('.lotto');
    const $resultLottos = $('#result-lotto');

    $lottos.forEach(($lotto, idx) => {
      $lotto.insertAdjacentHTML(
        'beforeend',
        `<div class="lotto-numbers">${lottos[idx].join(', ')}</div>`,
      );
    });

    $resultLottos.classList.toggle('checked');
  }

  initLottos() {
    const $lottosNumbers = $$('.lotto-numbers');
    const $resultLottos = $('#result-lotto');

    $lottosNumbers.forEach(($lottosNumber) => {
      $lottosNumber.remove();
    });

    $resultLottos.classList.toggle('checked');
  }

  initResult() {
    this.$result.replaceChildren();
  }
}
