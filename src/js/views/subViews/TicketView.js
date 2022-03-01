import template from '../../templates/template.js';
import { SELECTOR } from '../../configs/contants.js';
import { $ } from '../../utils/utils.js';

export default class TicketView {
  constructor(target) {
    this.$target = $(target);
    this.isShowNumber = false;
  }

  render() {
    this.mountTemplate();
    this.afterMounted();
    this.mountShowNumberToggleView();
  }

  mountTemplate() {
    this.$target.innerHTML = template.ticketSection();
  }

  afterMounted() {
    this.$ticketListWrap = $(SELECTOR.TICKET_LIST_WRAP);
    this.$showNumberToggleArea = $(SELECTOR.SHOW_NUMBER_TOGGLE_AREA);
  }

  mountShowNumberToggleView() {
    this.$showNumberToggleArea.innerHTML = template.showNumberToggleArea(
      this.isShowNumber
    );
    this.$slider = $(SELECTOR.SWITCH);
  }

  updateTicketListView(lottoList) {
    this.$ticketListWrap.innerHTML = template.ticketListWrap(
      lottoList,
      this.isShowNumber
    );
  }

  toggleIsShowNumber() {
    this.isShowNumber = !this.isShowNumber;
  }

  bindOnClickNumberToggle(callback) {
    this.$slider.addEventListener('change', (event) => {
      event.preventDefault();
      this.toggleIsShowNumber();
      callback();
    });
  }
}
