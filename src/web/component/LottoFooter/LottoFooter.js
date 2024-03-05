import styles from './LottoFooter.module.css';

class LottoFooter extends HTMLElement {
  connectedCallback() {
    this.#render();
  }

  #render() {
    this.innerHTML = `
      <footer class=${styles.footer}>
        <p>Copyright 2023. woowacourse</p>
      </footer>
    `;
  }
}

customElements.define('lotto-footer', LottoFooter);
