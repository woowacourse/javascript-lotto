import { selectDom } from '../utils/utils';

class ResultModalView {
  constructor() {
    this.modal = selectDom('.modal');
    this.matchResultTableDataList = this.modal.querySelectorAll('.match-result');
    this.profitSpan = selectDom('.profit', this.modal);
    this.closeButton = selectDom('.close-button', this.modal);
    this.closeButton.addEventListener('click', this.toggleModal);
  }

  renderResultModal(results) {
    this.modal.classList.remove('hide');
    this.matchResultTableDataList.forEach((td) => {
      const { matchCount } = td.dataset;
      const result = results.matches[matchCount] || 0;
      td.textContent = result || 0;
    });
    this.profitSpan.textContent = results.profit;
  }

  toggleModal = (action) => {
    if (action === 'open') {
      this.modal.classList.remove('hide');
      return;
    }
    this.modal.classList.add('hide');
  };
}

export default ResultModalView;
