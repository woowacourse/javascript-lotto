import makeTemplate from './template';

export default class ResultView {
  constructor() {
    this.$result = document.querySelector('#result');
  }

  renderResult(count) {
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeResultTemplate(count));
  }

  renderLottos(lottos) {
    const $lottos = document.querySelectorAll('.lotto');
    const $resultLottos = document.querySelector('#result-lotto');

    $lottos.forEach(($lotto, idx) => {
      $lotto.insertAdjacentHTML(
        'beforeend',
        `<div class="lotto-numbers">${lottos[idx].join(', ')}</div>`,
      );
    });

    $resultLottos.classList.toggle('checked');
  }

  initLottos() {
    const $lottosNumbers = document.querySelectorAll('.lotto-numbers');
    const $resultLottos = document.querySelector('#result-lotto');

    $lottosNumbers.forEach(($lottosNumber) => {
      $lottosNumber.remove();
    });

    $resultLottos.classList.toggle('checked');
  }
}
