import View from './View';

export default class LottoResultModalView extends View {
  constructor() {
    super();

    //멤버변수 초기화
    this.app = document.getElementById('app');
    this.modal = document.getElementById('winning-statistics-modal');
    this.restartButton = document.getElementById('restart-button');
    this.closeButton = document.getElementById('close-button');
    this.winningCounts = document.querySelectorAll('.winning-count');
    this.totalProfitRate = document.getElementById('total-profit-rate');

    //이벤트
    this.closeButton.addEventListener('click', this.hideModal.bind(this));
    this.restartButton.addEventListener(
      'click',
      this.clickRestartButtonHandler.bind(this),
    );
  }

  renderLottoResult(lottoResult) {
    const countPerRanking = Object.values(lottoResult);

    this.winningCounts.forEach(
      (winningCount, index) =>
        (winningCount.textContent = `${countPerRanking[4 - index]}개`),
    );
  }

  renderTotalProfitRate(totalProfitRate) {
    this.totalProfitRate.textContent = totalProfitRate;
  }

  clickRestartButtonHandler() {
    this.hideModal();
    this.handlers.get('lottoResultModalClick').forEach(func => func());
  }

  hideModal() {
    this.app.classList.replace('modal-on', 'modal-off');
    this.modal.classList.replace('modal-show', 'modal-hide');
  }
}
