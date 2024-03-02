import BaseComponent from '../BaseComponent/BaseComponent';

class MainApp extends BaseComponent {
  render() {
    this.outerHTML = `<main id="app">
    <h1 class="title text-lotto-title">🎱 내 번호 당첨 확인 🎱</h1>
    <purchase-lotto></purchase-lotto>
    <div class="purchased-lotto">
      <div class="purchased-lotto__label"></div>
      <div class="purchased-lotto__list text-lotto-body"></div>
    </div>
    <winning-lotto></winning-lotto>
    <div class="result hidden">
      <div id="error-result" class="text-lotto-error"></div>
      <button class="result__button text-lotto-caption button-primary">결과 확인하기</button>
    </div>
  </main>`;
  }

  setEvent() {}
}
customElements.define('main-app', MainApp);
