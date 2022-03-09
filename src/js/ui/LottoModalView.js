import { DOM } from '../constants/constants';
import { lottoResultTableTemplate } from './template';
import $ from './utils';

export class LottoModalView {
  constructor() {
    this.$container = $(DOM.ID.LOTTO_MODAL);
    this.$lottoTable = $(DOM.ID.LOTTO_RESULT_TABLE);
  }

  show(machine) {
    this.$lottoTable.replaceChildren();
    this.$lottoTable.insertAdjacentHTML(
      'beforeend',
      lottoResultTableTemplate(machine)
    );
    $(
      DOM.ID.LOTTO_RESULT_RATIO
    ).textContent = `당신의 총 수익률은 ${machine.profitRate}%입니다.`;
    this.$container.classList.add('flex');
    this.$container.classList.remove('hide');
    this.bindEventsToModalBtn();
  }

  bindEventsToModalBtn() {
    $(DOM.ID.MODAL_CLOSE_BUTTON).addEventListener(
      'click',
      this.closeModal.bind(this)
    );
    $(DOM.ID.RESTART_BUTTON).addEventListener('click', this.restart.bind(this));
  }
  restart() {
    this.closeModal();
    const restartEvent = new CustomEvent('restart');
    this.$container.dispatchEvent(restartEvent);
  }
  closeModal() {
    this.$container.classList.add('hide');
    this.$container.classList.remove('flex');
  }
}
