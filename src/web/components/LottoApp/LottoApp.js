import BaseComponent from '../BaseComponent/BaseComponent.js';
import styles from './LottoApp.module.css';

class LottoApp extends BaseComponent {
  setEvent() {
    this.on({ target: document, eventName: 'reset' }, () => this.render());
  }

  render() {
    this.innerHTML = `
        <header class=${styles.navBar}>
          <h1 class="title">🎱 행운의 로또</h1>
        </header>
        <main class=${styles.mainContainer}>
          <h2 class="${styles.mainTitle} title">🎱 내 번호 당첨 확인 🎱</h2>
          <purchased-lotto-form></purchased-lotto-form>
          <purchased-lotto-section class="close"></purchased-lotto-section>
          <winning-detail-form class="close"></winning-detail-form>
        </main>
        <footer class=${styles.footer}>
          <p class="caption">Copyright 2023. woowacourse</p>
        </footer>
        <winning-statistics-modal class="close"></winning-statistics-modal>
    `;
  }
}

customElements.define('lotto-app', LottoApp);
