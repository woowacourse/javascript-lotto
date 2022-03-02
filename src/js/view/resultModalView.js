import { selectDom } from '../utils/utils';

class ResultModalView {
  constructor(resetFunction) {
    this.body = selectDom('body');
    this.modal = selectDom('.modal');
    this.matchResultTableDataList = this.modal.querySelectorAll('.match-result');
    this.profitSpan = selectDom('.profit', this.modal);
    this.closeButton = selectDom('.close-button', this.modal);
    this.closeButton.addEventListener('click', this.toggleModal);
    this.restartButton = selectDom('.restart-button', this.modal);
    this.restartButton.addEventListener('click', resetFunction);
  }

  renderResultModal(results) {
    this.toggleModal('open');
    this.matchResultTableDataList.forEach((td) => {
      const { matchCount } = td.dataset;
      const result = results.matches[matchCount] || 0;
      td.textContent = result || 0;
    });
    this.profitSpan.textContent = results.profit;
  }

  resetView() {
    this.toggleModal('close');
    this.matchResultTableDataList.forEach((td) => {
      td.textContent = '';
    });
    this.profitSpan.textContent = '';
  }

  toggleModal = (action) => {
    if (action === 'open') {
      this.body.style.overflowY = 'hidden';
      this.modal.style.top = `${window.scrollY}px`;
      this.modal.classList.remove('hide');
      return;
    }
    this.body.style.overflowY = 'scroll';
    this.modal.classList.add('hide');
  };
}

export default ResultModalView;
