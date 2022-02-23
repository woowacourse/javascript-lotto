import { $ } from '../utils/utils.js';
import { validator } from '../utils/validator.js';
import template from '../templates/template.js';

export default class View {
  state;

  constructor($target) {
    this.$target = $target;
  }

  cacheDOMElements() {
    this.$paymentInput = $('#payment-input');
    this.$paymentSubmit = $('#payment-submit');
  }

  bindEventListener(type, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);

    this.$target.addEventListener(type, (e) => {
      if (!isTarget(e.target)) return;

      e.preventDefault();
      callback(e);
    });
  }

  bindOnClickPaymentSubmit(callback) {
    this.bindEventListener('click', '#payment-submit', () => {
      const amount = this.$paymentInput.valueAsNumber;

      try {
        validator.checkChargeAmount(amount);
        callback(amount);
      } catch (e) {
        alert(e);
      }
    });
  }

  bindOnClickNumberToggle() {
    this.bindEventListener('click', '#slider', () => {
      const { isShowNumber } = this.state;
      this.update({ isShowNumber: !isShowNumber });
    });
  }

  update(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.cacheDOMElements();
  }

  template() {
    const { lottoList, isShowNumber } = this.state;

    return template.app({ lottoList, isShowNumber });
  }
}
