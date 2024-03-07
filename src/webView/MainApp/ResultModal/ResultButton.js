import BaseComponent from '@webView/BaseComponent/BaseComponent';
import ResultModalListener from './ResultModalListener';

class ResultButton extends BaseComponent {
  render() {
    this.innerHTML = `
    <div id="error-result" class="text-lotto-error"></div>
    <button class="result__button text-lotto-caption button-primary">결과 확인하기</button>
  `;
  }

  setEvent() {
    this.on(
      { target: '.result__button', eventName: 'click' },
      ResultModalListener.resultButtonListener,
    );
  }

  printErrorMessage(message) {
    this.querySelector('#error-result').textContent = message;
    document.querySelector('winning-lotto').showError();
  }
  removeErrorMessage() {
    this.querySelector('#error-result').textContent = '';
    document.querySelector('winning-lotto').removeError();
  }
}

customElements.define('result-button', ResultButton);
