import BaseComponent from '../BaseComponent/BaseComponent';
import PurchasedLotto from '../PurchasedLotto/PurchasedLotto';
import Lotto from '../Lotto/Lotto';
import PurchaseLottoService from '../../domain/service/PurchaseLottoService';

const CLASSNAME_HIDDEN = 'hidden';
const SELECTOR_WINNING_LOTTO = '.winning-lotto';
const SELECTOR_RESULT = '.result';
const SELECTOR_PURCHASE = '.purchase-form__input';
const SELECTOR_PURCHASED = '.purchased-lotto__list';

class PurchaseLotto extends BaseComponent {
  render() {
    this.outerHTML = `      <div class="purchase"> 
<label class="purchase__label text-lotto-body">구입할 금액을 입력해주세요.</label>
<div class="purchase-form">
  <input
    class="purchase-form__input"
    type="number"
    placeholder="금액"
    aria-describedby="error-purchase-money"
  />
  <button class="purchase-form__button button-primary">구입</button>
</div>
<div id="error-purchase-money" class="text-lotto-error"></div>
</div>`;
  }

  setEvent() {
    this.on(
      { target: '.purchase-form__button', eventName: 'click' },
      this.#purchaseLottoListener.bind(this),
    );
  }

  #printErrorMessage(message) {
    document.querySelector('#error-purchase-money').textContent = message;
  }
  #removeErrorMessage() {
    document.querySelector('#error-purchase-money').textContent = '';
  }
  #showWinningPart() {
    document.querySelector(SELECTOR_WINNING_LOTTO).classList.remove(CLASSNAME_HIDDEN);
    document.querySelector(SELECTOR_RESULT).classList.remove(CLASSNAME_HIDDEN);
  }

  #purchaseLottoListener(event) {
    event.preventDefault();

    this.#removeErrorMessage();
    this.#clearLottos();

    const purchaseMoney = document.querySelector(SELECTOR_PURCHASE);
    const lottos = this.#getLottos(purchaseMoney.value);
    this.#appendLottos(lottos);
    this.#showWinningPart();
  }

  #getLottos(purchaseMoney) {
    try {
      return new PurchaseLottoService(purchaseMoney).getLottos();
    } catch (error) {
      this.#printErrorMessage(error.message);
      console.log(error.message);
      return;
    }
  }

  #appendLottos(lottos) {
    const purchased = document.querySelector(SELECTOR_PURCHASED);
    const fragment = document.createDocumentFragment();
    lottos.forEach((lotto) => fragment.append(new Lotto(lotto)));
    purchased.append(fragment);
  }

  #clearLottos() {
    const purchased = document.querySelector(SELECTOR_PURCHASED);
    purchased.innerHTML = '';
  }
}

customElements.define('purchase-lotto', PurchaseLotto);
