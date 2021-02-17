import { $, createElement } from '../utils.js';

export default class LottoView {
  show($element) {
    $element.classList.remove('hidden');
  }

  hide($element) {
    $element.classList.add('hidden');
  }

  enableElement($element) {
    $element.disabled = false;
  }

  disableElement($element) {
    $element.disabled = true;
  }

  renderLottoList(lottos) {
    const $lottoListChildren = lottos.map((lotto) => {
      const $lottoSpan = createElement('span', 'lotto mx-1 text-4xl', '🎟️ ');
      $lottoSpan.appendChild(createElement('span', 'lotto-numbers', lotto.numbers.join(', ')));
      return $lottoSpan;
    });

    $('.lotto-list').append(...$lottoListChildren);
    $('.lotto-count').append(lottos.length);
  }
}
