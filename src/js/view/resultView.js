import $ from '../utils/dom';
import makeTemplate from './template';

export default class ResultView {
  constructor() {
    this.$result = $('#result');
  }

  renderResult(count) {
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeResultTemplate(count));
  }

  renderLottos(lottos) {
    const $resultLottos = $('#result-lotto');
    const $lottos = $resultLottos.querySelectorAll('.lotto');

    $lottos.forEach(($lotto, idx) => {
      $lotto.insertAdjacentHTML(
        'beforeend',
        `<div class="lotto-numbers">${lottos[idx].join(', ')}</div>`,
      );
    });

    $resultLottos.classList.toggle('checked');
  }

  initLottos() {
    const $resultLottos = $('#result-lotto');
    const $lottosNumbers = $resultLottos.querySelectorAll('.lotto-numbers');

    $lottosNumbers.forEach(($lottosNumber) => {
      $lottosNumber.remove();
    });

    $resultLottos.classList.toggle('checked');
  }

  initResult() {
    this.$result.replaceChildren();
  }
}
