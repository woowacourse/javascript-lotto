import { $, $all, createElement } from '../utils/utils.js';
import { SELECTORS } from '../constants.js';

export default class LottoView {
  renderLottoNumbersInput(lottoCount) {
    $(SELECTORS.LOTTO_NUMBERS_INPUT.LOTTO_COUNT_TEXT).textContent = lottoCount;
  }

  // TODO: 현재 토글 버튼에 대한 옵션과 상관 없이 표시되는 문제 해결
  renderLottoList(lottos) {
    const $lottoList = createElement('div', 'lotto-list d-flex flex-wrap');

    const lottoFragments = lottos.map((lotto) => {
      const fragment = document.createDocumentFragment();
      const childrenFragment = document.createDocumentFragment();

      const $lotto = fragment.appendChild(createElement('span', 'lotto mx-1 text-4xl d-flex .items-center', '🎟️ '));

      childrenFragment.appendChild(
        createElement('span', 'lotto-numbers', lotto.NumbersString)
      );
      $lotto.appendChild(childrenFragment);

      return fragment;
    });

    $lottoList.append(...lottoFragments);
    $(SELECTORS.LOTTO_LIST.CONTAINER).append($lottoList);
    $(SELECTORS.LOTTO_LIST.LOTTO_COUNT_TEXT).textContent = lottos.length;
  }

  renderWinningResult(winningRankCounts, winningRate) {
    $all(SELECTORS.MODAL.WINNING_COUNT_TEXT).forEach(($winningCount) => {
      $winningCount.textContent = winningRankCounts[$winningCount.dataset.rank];
    });

    $(SELECTORS.MODAL.WINNING_RATE_TEXT).textContent = winningRate;
  }
}
