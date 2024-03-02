import BaseComponent from '../BaseComponent/BaseComponent';

class PurchasedLotto extends BaseComponent {
  render() {
    this.outerHTML = `<div class="purchased-lotto">
    <div class="purchased-lotto__label"></div>
    <div class="purchased-lotto__list text-lotto-body"></div>
  </div>`;
  }
  setEvent() {}
  show() {}
  static clear() {
    document.querySelector('.purchased-lotto__list').innerHTML = '';
  }
}

customElements.define('purchased-lotto', PurchasedLotto);

export default PurchasedLotto;
