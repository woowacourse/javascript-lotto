import { $, $all, createElement } from '../utils.js';

export default class LottoView {
  renderWinningResult(result) {
    const { winningRankCounts, winningRate } = result;

    $all('.winning-count').forEach(($winningCount) => {
      $winningCount.textContent = winningRankCounts[$winningCount.dataset.rank];
    });

    $('.winning-rate').textContent = winningRate;
  }

  renderLottoList(lottos) {
    const $lottoList = createElement('div', 'lotto-list d-flex flex-wrap');
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

    $lottoList.append(...lottoFragments);
    $('.lotto-list-container').append($lottoList);
    $('.lotto-count').textContent = lottos.length;
  }
}
