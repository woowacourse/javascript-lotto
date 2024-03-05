import styles from './LottoHeader.module.css';

class LottoHeader extends HTMLElement {
  connectedCallback() {
    this.#render();
  }

  #render() {
    this.innerHTML = `
      <header class="${styles.header}">
        <h1 class="${styles.title}">🎱 행운의 로또</h1>
      </header>
    `;
  }
}

customElements.define('lotto-header', LottoHeader);
