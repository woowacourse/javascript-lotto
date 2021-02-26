import { $, $all, createElement } from '../utils.js';

export default class LottoView {
  renderLottoList(lottos) {
    const $lottoList = createElement('div', 'lotto-list d-flex flex-wrap');

    const lottoFragments = lottos.map((lotto) => {
      const fragment = document.createDocumentFragment();
      const childrenFragment = document.createDocumentFragment();

      const $lotto = fragment.appendChild(createElement('span', 'lotto mx-1 text-4xl d-flex .items-center', '🎟️ '));

      childrenFragment.appendChild(
        createElement('span', 'lotto-numbers d-none', lotto.NumbersString)
      );
      $lotto.appendChild(childrenFragment);

      return fragment;
    });

    $lottoList.append(...lottoFragments);
    $('.lotto-list-container').append($lottoList);
    $('.lotto-count').textContent = lottos.length;
  }

  renderWinningResult(winningRankCounts, winningRate) {
    $all('.winning-count').forEach(($winningCount) => {
      $winningCount.textContent = winningRankCounts[$winningCount.dataset.rank];
    });

    $('.winning-rate').textContent = winningRate;
  }
}
