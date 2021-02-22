import { $, $all, createElement } from '../utils.js';

export default class LottoView {
  renderWinningResult(result) {
    const { winningRankCounts, winningRate } = result;

    $all('.winning-count')
      .reverse()
      .forEach(($winningCount, index) => {
        // TODO: modal을 다시 띄우기 전에 기존 text 삭제 필요
        $winningCount.textContent = Object.values(winningRankCounts)[index];

        // $winningCount.append(Object.values(winningRankCounts)[index]);
      });

    // $('.winning-rate').append(winningRate);
    $('.winning-rate').textContent = winningRate;
  }

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
