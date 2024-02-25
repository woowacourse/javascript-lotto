import BaseComponent from '../BaseComponent/BaseComponent.js';

import styles from './PurchasedLottoForm.module.css';

import BuyLottoPriceValidator from '../../../validator/buyLottoPrice/BuyLottoPriceValidator.js';

import AppError from '../../../errors/AppError/AppError.js';

import { removeErrorMessage, showErrorMessage } from '../../utils/errorMessage.js';
import { $ } from '../../utils/dom.js';

import { COMPONENT_SELECTOR, CUSTOM_EVENT_TYPE } from '../../../constants/webApplication.js';

class PurchasedLottoForm extends BaseComponent {
  render() {
    this.innerHTML = `
        <form id="purchased-lotto-form">
          <label for="purchased-lotto-input" class="body">구입할 금액을 입력해주세요.</label>
          <div id="input-container" class=${styles.inputContainer}>
            <input id="purchased-lotto-input" type="number" class="${styles.purchasedLottoPriceInput} placeholder" placeholder="금액"/>
            <button type="submit" class="${styles.purchasedButton} caption">구입</button>
          </div>
        </form>
    `;
  }

  setEvent() {
    this.on(
      { target: $(this, COMPONENT_SELECTOR.purchasedLottoForm), eventName: 'submit' },
      this.#handleSubmitBuyLottoPrice.bind(this),
    );
  }

  #handleSubmitBuyLottoPrice(event) {
    try {
      event.preventDefault();

      const purchasedLottoPrice = this.#getPurchasedLottoPrice();
      BuyLottoPriceValidator.check(purchasedLottoPrice);

      removeErrorMessage(this);

      $(this, COMPONENT_SELECTOR.purchasedLottoInput).value = '';

      this.emit(CUSTOM_EVENT_TYPE.buyLottoPrice, Number(purchasedLottoPrice));
    } catch (error) {
      if (error instanceof AppError) {
        const nonPrefixErrorMessage = error.message.replace(AppError.PREFIX, '');
        showErrorMessage(nonPrefixErrorMessage, COMPONENT_SELECTOR.purchasedLottoForm);
      }
    }
  }

  #getPurchasedLottoPrice() {
    const purchasedLottoInputElement = $(this, COMPONENT_SELECTOR.purchasedLottoInput);

    return purchasedLottoInputElement?.value;
  }
}

customElements.define('purchased-lotto-form', PurchasedLottoForm);
