import BaseComponent from '../BaseComponent/BaseComponent';

class ResultButton extends BaseComponent {
  render() {
    this.outerHTML = `<div class="result hidden">
    <div id="error-result" class="text-lotto-error"></div>
    <button class="result__button text-lotto-caption button-primary">결과 확인하기</button>
  </div>`;
  }

  setEvent() {}
}
customElements.define('result-button', ResultButton);
