import { $, $all, createElement, enableElement, hideElement } from '../utils/utils.js';
import { SELECTORS } from '../constants.js';

export default class LottoListView {
  render(lottos) {
    const $lottoList = createElement('div', 'lotto-list d-flex flex-wrap');

    const lottoFragments = lottos.map((lotto) => {
      const fragment = document.createDocumentFragment();
      const childrenFragment = document.createDocumentFragment();

      const $lotto = fragment.appendChild(
        createElement('span', 'lotto mx-1 text-4xl d-flex .items-center', '🎟️ ')
      );

      childrenFragment.appendChild(createElement('span', 'lotto-numbers', lotto.NumbersString));
      $lotto.appendChild(childrenFragment);

      return fragment;
    });

    $lottoList.append(...lottoFragments);
    $(SELECTORS.LOTTO_LIST.CONTAINER).append($lottoList);
    $(SELECTORS.LOTTO_LIST.LOTTO_COUNT_TEXT).textContent = lottos.length;
  }
}
