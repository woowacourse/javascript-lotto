import { SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';

class ResultModalView {
  constructor() {
    this.body = selectDom(SELECTOR.BODY_TAG);
    this.modal = selectDom(SELECTOR.MODAL_CLASS);
    this.matchResultTableDataList = this.modal.querySelectorAll(SELECTOR.MATCH_TABLE_DATA_CLASS);
    this.profitSpan = selectDom(SELECTOR.PROFIT_SPAN_CLASS, this.modal);
    this.closeButton = selectDom(SELECTOR.MODAL_CLOSE_BUTTON_CLASS, this.modal);
    this.closeButton.addEventListener('click', this.#toggleModal);
  }

  renderResultModal(matchResult) {
    this.#toggleModal('open');
    this.matchResultTableDataList.forEach((td) => {
      const { matchCount } = td.dataset;
      const result = matchResult.matches[matchCount] || 0;
      td.textContent = result || 0;
    });
    this.profitSpan.textContent = Math.floor(matchResult.profit);
  }

  resetView() {
    this.#toggleModal('close');
    this.matchResultTableDataList.forEach((td) => {
      td.textContent = '';
    });
    this.profitSpan.textContent = '';
  }

  #toggleModal = (action) => {
    if (action === 'open') {
      this.body.classList.add('stop-scroll');
      this.modal.style.top = `${window.scrollY}px`;
      this.modal.classList.remove('hide');
      return;
    }
    this.body.style.overflowY = 'scroll';
    this.modal.classList.add('hide');
  };
}

export default ResultModalView;
