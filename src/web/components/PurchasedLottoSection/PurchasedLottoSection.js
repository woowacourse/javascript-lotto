import BaseComponent from '../BaseComponent/BaseComponent.js';
import PurchasedLotto from '../PurchasedLotto/PurchasedLotto.js';

import styles from './PurchasedLottoSection.module.css';

import BuyLottoService from '../../../service/BuyLottoService.js';

import { CUSTOM_EVENT_TYPE } from '../../../constants/webApplication.js';

class PurchasedLottoSection extends BaseComponent {
  #buyLottoPrice = 0;

  #lottoNumbers = [];

  #lottosTemplate = '';

  render() {
    this.innerHTML = `
        <section>
          <p class="${styles.purchasedMessage} body">총 ${
      this.#lottoNumbers?.length
    }개를 구매하였습니다.</p>
          <ul class="${styles.purchasedLottos}">
            ${this.#lottosTemplate}
          </ul>
        </section>
    `;
  }

  removeEvent() {
    this.off(
      { target: document, eventName: CUSTOM_EVENT_TYPE.buyLottoPrice },
      this.#handleRenderPurchasedLottoSection.bind(this),
    );
  }

  setEvent() {
    this.on(
      { target: document, eventName: CUSTOM_EVENT_TYPE.buyLottoPrice },
      this.#handleRenderPurchasedLottoSection.bind(this),
    );
  }

  #handleRenderPurchasedLottoSection(event) {
    this.#updateBuyLottoDetail(event);

    this.#lottosTemplate = this.#createLottosTemplate();

    this.classList.remove('close');

    this.connectedCallback();
  }

  #updateBuyLottoDetail(event) {
    this.#buyLottoPrice = event?.detail;

    const lottoNumbers = BuyLottoService.createLottoNumbers(this.#buyLottoPrice);
    this.#lottoNumbers = lottoNumbers;
  }

  #createLottosTemplate() {
    return this.#lottoNumbers.reduce(this.#createLottoTemplate, '');
  }

  #createLottoTemplate(prevLottosTemplate, lottoNumber) {
    const lottoElement = new PurchasedLotto(lottoNumber);
    const addedLottoTemplate = `${prevLottosTemplate}\n${lottoElement.getTemplate()}`;

    return addedLottoTemplate;
  }

  getBuyLottoDetails() {
    return { lottoNumbers: this.#lottoNumbers, buyLottoPrice: this.#buyLottoPrice };
  }
}

customElements.define('purchased-lotto-section', PurchasedLottoSection);
