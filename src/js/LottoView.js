import { $, $all, createElement, enableElement, hideElement } from './utils/utils.js';
import { SELECTORS } from './constants.js';

export default class LottoView {
  renderLottoNumbersInput(lottoCount) {
    $(SELECTORS.LOTTO_NUMBERS_INPUT.LOTTO_COUNT_TEXT).textContent = lottoCount;
  }

  renderLottoList(lottos) {
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

  renderWinningResult(winningRankCounts, winningRate) {
    $all(SELECTORS.MODAL.WINNING_COUNT_TEXT).forEach(($winningCount) => {
      $winningCount.textContent = winningRankCounts[$winningCount.dataset.rank];
    });

    $(SELECTORS.MODAL.WINNING_RATE_TEXT).textContent = winningRate;
  }

  openModal() {
    $(SELECTORS.MODAL.CONTAINER).classList.add('open');
  }

  closeModal() {
    $(SELECTORS.MODAL.CONTAINER).classList.remove('open');
    $(SELECTORS.WINNING_NUMBER_INPUT.FIRST_INPUT).focus();
  }

  reset() {
    hideElement($(SELECTORS.LOTTO_LIST.SECTION));
    hideElement($(SELECTORS.WINNING_NUMBER_INPUT.SECTION));
    enableElement($(SELECTORS.MONEY_INPUT.INPUT));
    enableElement($(SELECTORS.MONEY_INPUT.SUBMIT_BUTTON));

    $(SELECTORS.MONEY_INPUT.FORM).reset();
    $(SELECTORS.LOTTO_NUMBERS_INPUT.FORM).reset();
    $(SELECTORS.WINNING_NUMBER_INPUT.FORM).reset();
    $(SELECTORS.MONEY_INPUT.INPUT).focus();
    $(SELECTORS.LOTTO_LIST.ELEMENT).remove();

    this.closeModal();
  }
}
