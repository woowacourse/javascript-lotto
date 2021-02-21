import { $, createElement } from '../utils.js';

export default class LottoView {
  renderLottoList(lottos) {
    const lottoFragments = lottos.map((lotto) => {
      const fragment = document.createDocumentFragment();
      const childrenFragment = document.createDocumentFragment();

      const $lotto = fragment.appendChild(createElement('span', 'lotto mx-1 text-4xl', '🎟️ '));

      childrenFragment.appendChild(
        createElement('span', 'lotto-numbers', lotto.numbers.join(', '))
      );
      $lotto.appendChild(childrenFragment);

      return fragment;
    });

    $('.lotto-list').append(...lottoFragments);
    $('.lotto-count').append(lottos.length);
  }
}
