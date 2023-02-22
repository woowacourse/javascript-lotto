import LottoUtils from '../domain/LottoUtils.js';
import { $$winningCounts, $closeButton, $modal, $yield, close, open } from '../utils/Dom.js';
import LottoView from './LottoView.js';

class ResultView extends LottoView {
  constructor($element) {
    super($element);
    this.ranks = [];
    this.bindRetryEvent();
    this.closeModal();
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
    $$winningCounts.forEach((winningCount, index) => {
      winningCount.textContent = this.createRankList(winningResult)[index];
    });
  }

  printYieldRate(winningResult, budget) {
    $yield.textContent = LottoUtils.calculateYieldRate(winningResult, budget);
  }

  bindRetryEvent() {
    this.$element.addEventListener('click', (e) => this.retryHandler(e));
  }

  retryHandler(e) {
    e.preventDefault();
    this.createCustomEvent('retryCommand');
    close($modal);
  }

  closeModal() {
    $closeButton.addEventListener('click', () => close($modal));
  }
}

export default ResultView;
