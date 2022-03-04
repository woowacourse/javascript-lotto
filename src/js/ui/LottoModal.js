import { lottoResultTableTemplate } from './template';
import $ from './utils';

export class LottoModal {
  constructor(view) {
    this.lottoView = view;
    this.$container = $('modal');
    this.$lottoTable = $('lotto-result-table');
  }

  show(machine) {
    this.$lottoTable.replaceChildren();
    this.$lottoTable.insertAdjacentHTML(
      'beforeend',
      lottoResultTableTemplate(machine)
    );
    $(
      'lotto-result-rate'
    ).textContent = `당신의 총 수익률은 ${machine.profitRate}%입니다.`;
    this.$container.style.display = 'flex';
    this.bindEventsToModalBtn();
  }

  bindEventsToModalBtn() {
    $('modal-close').addEventListener('click', this.closeModal.bind(this));
    $('restart').addEventListener('click', this.restart.bind(this));
  }
  restart() {
    this.closeModal();
    this.lottoView.restart();
  }
  closeModal() {
    this.$container.style.display = 'none';
  }
}
