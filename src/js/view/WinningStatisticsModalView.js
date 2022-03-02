import View from './View';

export default class WinningStatisticsModalView extends View {
  constructor() {
    super();

    this.app = document.getElementById('app');
    this.modal = document.getElementById('winning-statistics-modal');
    this.restartButton = document.getElementById('restart-button');
    this.closeButton = document.getElementById('close-button');
    this.winningCounts = document.getElementsByClassName('winning-count');
    this.totalProfitRate = document.getElementById('total-profit-rate');

    this.closeButton.addEventListener('click', this.hideModal.bind(this));
    this.restartButton.addEventListener(
      'click',
      this.clickRestartButtonHandler.bind(this),
    );
  }

  renderLottoResult(lottoResult) {
    const reverseRanking = Object.values(lottoResult).reverse();

    Array.from(this.winningCounts).forEach(
      (element, index) => (element.textContent = reverseRanking[index] + '개'),
    );
  }

  renderTotalProfitRate(totalProfitRate) {
    this.totalProfitRate.textContent = totalProfitRate;
  }

  clickRestartButtonHandler() {
    this.hideModal();
    this.handlers.get('winningStatisticsClick').forEach(func => func());
  }

  hideModal() {
    this.app.classList.replace('modal-on', 'modal-off');
    this.modal.classList.replace('modal-show', 'modal-hide');
  }
}
