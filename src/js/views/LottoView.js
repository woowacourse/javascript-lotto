import { $, createElement } from '../utils.js';

export default class LottoView {
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
