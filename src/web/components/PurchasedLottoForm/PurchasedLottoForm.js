import BaseComponent from '../BaseComponent/BaseComponent.js';
import styles from './PurchasedLottoForm.module.css';
import BuyLottoPriceValidator from '../../../validator/buyLottoPrice/BuyLottoPriceValidator.js';

import { showErrorMessage } from '../../utils/showErrorMessage.js';
import AppError from '../../../errors/AppError/AppError.js';

class PurchasedLottoForm extends BaseComponent {
  render() {
    this.innerHTML = `
        <form id="purchased-lotto-form">
          <label for="purchased-lotto-input" class="body">구입할 금액을 입력해주세요.</label>
          <section id="input-container" class=${styles.inputContainer}>
            <input id="purchased-lotto-input" type="number" class="${styles.purchasedLottoPriceInput} placeholder" placeholder="금액"/>
            <button class="${styles.purchasedButton} caption">구입</button>
          </section>
        </form>
    `;
  }

  setEvent() {
    this.querySelector('#purchased-lotto-form').addEventListener(
      'submit',
      this.#handleSubmitBuyLottoPrice.bind(this),
    );
  }

  #handleSubmitBuyLottoPrice(event) {
    try {
      event.preventDefault();

      const purchasedLottoPrice = this.#getPurchasedLottoPrice();
      BuyLottoPriceValidator.check(purchasedLottoPrice);

      this.#removeErrorMessage();

      this.querySelector('#purchased-lotto-input').value = '';

      this.emit('buyLottoPrice', Number(purchasedLottoPrice));
    } catch (error) {
      if (error instanceof AppError) {
        const nonPrefixErrorMessage = error.message.replace('[ERROR]', '');
        showErrorMessage(nonPrefixErrorMessage, '#purchased-lotto-form');
      }
    }
  }

  #getPurchasedLottoPrice() {
    const purchasedLottoInputElement = this.querySelector('#purchased-lotto-input');

    return purchasedLottoInputElement?.value;
  }

  #removeErrorMessage() {
    const errorMessageElement = this.querySelector('.error-message');

    if (errorMessageElement) errorMessageElement.remove();
  }
}

customElements.define('purchased-lotto-form', PurchasedLottoForm);
