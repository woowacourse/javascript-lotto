import BaseComponent from '@webView/BaseComponent/BaseComponent';
import Lotto from './Lotto';

class PurchasedLotto extends BaseComponent {
  render() {
    this.innerHTML = `
    <div class="purchased-lotto__label text-lotto-body"></div>
    <div class="purchased-lotto__list text-lotto-body"></div>`;
  }

  static clear() {
    this.querySelector('.purchased-lotto__list').innerHTML = '';
  }
  appendLottos(lottos) {
    const fragment = document.createDocumentFragment();
    lottos.forEach((lotto) => fragment.append(new Lotto(lotto)));
    this.querySelector('.purchased-lotto__list').append(fragment);
  }
}

customElements.define('purchased-lotto', PurchasedLotto);

export default PurchasedLotto;
