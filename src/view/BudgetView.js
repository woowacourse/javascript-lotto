import LottoView from './LottoView.js';

class BudgetView extends LottoView {
  constructor($element) {
    super($element);
    this.bindInputPriceEvent();
  }

  bindInputPriceEvent() {
    this.$element.addEventListener('submit', (e) => this.inputPriceHandler(e));
  }

  inputPriceHandler(e) {
    e.preventDefault();
    this.createCustomEvent('inputPrice', e.target.elements.budget.value);
  }

  printLotto($element, content) {
    $element.insertAdjacentHTML(
      'beforeend',
      `<li class="ticket"><span class="ticket__emoji">🎟</span><span class="ticket__number">${content}</span></li>`
    );
  }
}

export default BudgetView;
