import LottoBuyer from '../../../domain/LottoBuyer/LottoBuyer.js';
import BaseComponent from '../BaseComponent/BaseComponent.js';
import PurchasedLotto from '../PurchasedLotto/PurchasedLotto.js';
import styles from './PurchasedLottoSection.module.css';

class PurchasedLottoSection extends BaseComponent {
  #buyLottoPrice;

  #lottoNumbers;

  setEvent() {
    document.addEventListener('buyLottoPrice', this.#handleRenderLottoNumbers.bind(this));
  }

  #handleRenderLottoNumbers(event) {
    this.#buyLottoPrice = event?.detail;

    this.classList.remove('close');

    this.render();
  }

  render() {
    this.#updateLottoNumbers();

    const lottosTemplate = this.#createLottosTemplate();

    this.innerHTML = `
        <section>
          <p class="${styles.purchasedMessage} body">총 ${
      this.#lottoNumbers.length
    }개를 구매하였습니다.</p>
          <ul class="${styles.purchasedLottos}">
            ${lottosTemplate}
          </ul>
        </section>
    `;
  }

  #updateLottoNumbers() {
    const lottoBuyer = new LottoBuyer(this.#buyLottoPrice);
    const lottoNumbers = lottoBuyer.purchase();

    this.#lottoNumbers = lottoNumbers;
  }

  #createLottosTemplate() {
    return this.#lottoNumbers.reduce((prevLottosTemplate, lottoNumber) => {
      const lottoElement = new PurchasedLotto(lottoNumber);

      return `${prevLottosTemplate}\n${lottoElement.getTemplate()}`;
    }, '');
  }
}

customElements.define('purchased-lotto-section', PurchasedLottoSection);
