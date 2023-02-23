import modalTemplate from './modalTemplate';

export default class ModalView {
  constructor() {
    this.$modalContainer = document.querySelector('#modal-container');
    this.$modalSection = document.querySelector('#modal-section');
    this.$closeIcon = document.querySelector('#close-icon');
    this.$tbody = document.querySelector('tbody');
    this.$lottoYield = document.querySelector('#lotto-yield');
    this.$retryButton = document.querySelector('#retry-button');
    this.connectEvents();
  }

  connectEvents() {
    this.$modalContainer.addEventListener('click', (e) => this.handleCloseClick(e));
  }

  handleCloseClick(e) {
    if (e.target === this.$modalContainer || e.target === this.$closeIcon) {
      this.closeModal();
    }
  }

  closeModal() {
    this.$modalSection.classList.replace('show', 'hidden');
    this.$modalContainer.classList.replace('show', 'hidden');
  }

  showStatistics(statistics) {
    this.$tbody.innerHTML = '';
    this.$tbody.insertAdjacentHTML(
      'beforeend',
      Object.entries(statistics)
        .map(([prize, count]) => modalTemplate(prize, count))
        .join('')
    );
  }

  showYield(lottoYield) {
    this.$lottoYield.textContent = lottoYield;
  }

  renderModal(statistics, yieldRatio) {
    this.$modalContainer.classList.replace('hidden', 'show');
    this.$modalSection.classList.replace('hidden', 'show');
    this.showStatistics(statistics);
    this.showYield(yieldRatio);
  }
}
