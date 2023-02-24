import LottoUtils from '../domain/LottoUtils.js';
import {
  $$winningCounts,
  $closeButton,
  $modal,
  $winningContainer,
  $yield,
  close,
  open,
} from '../utils/Dom.js';
import LottoView from './LottoView.js';

class ResultView extends LottoView {
  constructor($element) {
    super($element);
    this.ranks = [];
    this.bindRetryEvent();
    this.bindCloseEvent();
  }

  openResultModal(winningResult, budget) {
    open($modal);

    this.printWinningCount(winningResult);
    this.printYieldRate(winningResult, budget);
  }

  createRankList(winningResult) {
    Object.keys(winningResult).forEach((rank, index) => {
      this.ranks[index] = winningResult[rank];
    });

    return this.ranks.reverse();
  }

  printWinningCount(winningResult) {
    const rank = this.createRankList(winningResult);

    $$winningCounts.forEach((winningCount, index) => {
      this.print(winningCount, rank[index]);
    });
  }

  printYieldRate(winningResult, budget) {
    this.print($yield, LottoUtils.calculateYieldRate(winningResult, budget));
  }

  bindRetryEvent() {
    this.$element.addEventListener('click', (e) => this.retryHandler(e));
  }

  retryHandler() {
    this.createCustomEvent('retryCommand');
    close($modal);
    close($winningContainer);
  }

  bindCloseEvent() {
    $closeButton.addEventListener('click', () => close($modal));
  }
}

export default ResultView;
