import { CUSTOM_EVENT_TYPE } from '../../../constants/webApplication.js';
import BaseComponent from '../BaseComponent/BaseComponent.js';
import styles from './LottoApp.module.css';

class LottoApp extends BaseComponent {
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
          <p class="caption">&copy;Copyright 2023. woowacourse</p>
        </footer>
        <winning-statistics-modal class="close"></winning-statistics-modal>
    `;
  }

  setEvent() {
    this.on(
      { target: document, eventName: CUSTOM_EVENT_TYPE.reset },
      this.#handleRenderLottoApp.bind(this),
    );
  }

  removeEvent() {
    this.off(
      { target: document, eventName: CUSTOM_EVENT_TYPE.reset },
      this.#handleRenderLottoApp.bind(this),
    );
  }

  #handleRenderLottoApp() {
    this.render();
  }
}

customElements.define('lotto-app', LottoApp);
