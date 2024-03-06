import BaseComponent from '../BaseComponent/BaseComponent';

class MainApp extends BaseComponent {
  render() {
    this.outerHTML = `<main id="app">
    <h1 class="title text-lotto-title">🎱 내 번호 당첨 확인 🎱</h1>
    <purchase-lotto class="purchase"></purchase-lotto>
    <purchased-lotto class="purchased-lotto"></purchased-lotto>
    <winning-lotto class="winning-lotto hidden"></winning-lotto>
    <result-button class="result hidden"></result-button>
  </main>`;
  }
}
customElements.define('main-app', MainApp);
