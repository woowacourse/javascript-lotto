import BaseComponent from '../BaseComponent/BaseComponent';
import PurchaseLottoService from '../../domain/service/PurchaseLottoService';

const CLASSNAME_HIDDEN = 'hidden';
const SELECTOR_WINNING_LOTTO = '.winning-lotto';
const SELECTOR_RESULT = '.result';
const SELECTOR_PURCHASE = '.purchase-form__input';
const SELECTOR_PURCHASED = '.purchased-lotto__list';
const SELECTOR_PURCHASED_LABEL = '.purchased-lotto__label';

class PurchaseLotto extends BaseComponent {
  render() {
    this.outerHTML = `      <div class="purchase"> 
<div class="purchase-form">
  <input
    class="purchase-form__input"
    type="number"
    placeholder="금액"
    aria-describedby="error-purchase-money"
  />
  <button class="purchase-form__button button-primary text-lotto-caption">구입</button>
</div>
<div id="error-purchase-money" class="text-lotto-error"></div>
</div>`;
  }

  setEvent() {
    this.on(
      { target: '.purchase-form__button', eventName: 'click' },
      this.#purchaseLottoListener.bind(this),
    );
    this.on({ target: '.purchase-form__input', eventName: 'keydown' }, (event) => {
      event.key === 'Enter' && this.#purchaseLottoListener(event).bind(this);
    });
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
    this.#removeBuyingMessage();
    this.#clearLottos();

    const purchaseMoney = document.querySelector(SELECTOR_PURCHASE);
    const lottos = this.#getLottos(purchaseMoney.value);
    if (!lottos) return;

    this.#showBuyingMessage(lottos.length);
    this.#appendLottos(lottos);
    this.#showWinningPart();
  }

  #showBuyingMessage(count) {
    document.querySelector(SELECTOR_PURCHASED_LABEL).innerHTML = `총 ${count}개를 구입하였습니다.`;
  }
  #removeBuyingMessage() {
    document.querySelector(SELECTOR_PURCHASED_LABEL).innerHTML = '';
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
    const purchased = document.querySelector('purchased-lotto');
    purchased.appendLottos(lottos);
  }

  #clearLottos() {
    const purchased = document.querySelector(SELECTOR_PURCHASED);
    purchased.innerHTML = '';
  }
}

customElements.define('purchase-lotto', PurchaseLotto);
