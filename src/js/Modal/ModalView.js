import { $, $all } from './utils/utils.js';
import { SELECTORS } from './constants.js';

export default class ModalView {
  renderWinningResult(winningRankCounts, winningRate) {
    $all(SELECTORS.MODAL.WINNING_COUNT_TEXT).forEach(($winningCount) => {
      $winningCount.textContent = winningRankCounts[$winningCount.dataset.rank];
    });

    $(SELECTORS.MODAL.WINNING_RATE_TEXT).textContent = winningRate;
  }
}
