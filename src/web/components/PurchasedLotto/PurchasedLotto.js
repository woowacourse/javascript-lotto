import BaseComponent from '../BaseComponent/BaseComponent.js';
import styles from './PurchasedLotto.module.css';

class PurchasedLotto extends BaseComponent {
  #lottoNumber;

  constructor(lottoNumber) {
    super();
    this.#lottoNumber = lottoNumber;
  }

  getTemplate() {
    return `
      <li class="${styles.purchasedLotto} body">
        <span class=${styles.ticketIcon}>🎟️</span>
        <span class=${styles.lottoNumber}>${this.#lottoNumber.join(', ')}</ㄴ>
      </li>
    `;
  }
}

customElements.define('purchased-lotto', PurchasedLotto);

export default PurchasedLotto;
