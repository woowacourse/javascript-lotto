import BaseComponent from '../BaseComponent/BaseComponent';
import Lotto from '../Lotto/Lotto';

class PurchasedLotto extends BaseComponent {
  render() {
    this.innerHTML = `
    <div class="purchased-lotto__label"></div>
    <div class="purchased-lotto__list text-lotto-body"></div>`;
  }
  setEvent() {}
  show() {}
  static clear() {
    document.querySelector('.purchased-lotto__list').innerHTML = '';
  }
  appendLottos(lottos) {
    const fragment = document.createDocumentFragment();
    lottos.forEach((lotto) => fragment.append(new Lotto(lotto)));
    this.querySelector('.purchased-lotto__list').append(fragment);
  }
}

customElements.define('purchased-lotto', PurchasedLotto);

export default PurchasedLotto;
