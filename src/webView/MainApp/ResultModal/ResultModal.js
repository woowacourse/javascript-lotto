import BaseComponent from '@webView/BaseComponent/BaseComponent';
import ResultModalListener from './ResultModalListener';

class ResultModal extends BaseComponent {
  render() {
    this.innerHTML = `
    <div class="result-modal-backdrop hidden"></div>
        <div class="result-modal-body hidden">
          <div class="result-modal-header">
            <div class="result-modal-header__close-button">X</div>
            <div class="result-modal-header__title text-lotto-subtitle">🏆 당첨 통계 🏆</div>
          </div>
          <table class="result-modal-table text-lotto-body">
            <thead>
              <tr class="result-modal-table__header">
                <th>일치 갯수</th>
                <th>당첨금</th>
                <th>당첨 갯수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3개</td>
                <td>5,000</td>
                <td><span class="result-modal-table__count"></span>개</td>
              </tr>
              <tr>
                <td>4개</td>
                <td>50,000</td>
                <td><span class="result-modal-table__count"></span>개</td>
              </tr>
              <tr>
                <td>5개</td>
                <td>150,000</td>
                <td><span class="result-modal-table__count"></span>개</td>
              </tr>
              <tr>
                <td>5개+보너스볼</td>
                <td>30,000,000</td>
                <td><span class="result-modal-table__count"></span>개</td>
              </tr>
              <tr>
                <td>6개</td>
                <td>2,000,000,000</td>
                <td><span class="result-modal-table__count"></span>개</td>
              </tr>
            </tbody>
          </table>
          <div class="result-modal__return-rate-text">
            당신의 총 수익률은 <span class="result-modal__return-rate">0</span>%입니다.
          </div>
          <div class="result-modal__reset-button button-primary text-lotto-caption">
            다시 시작하기
          </div>
        </div>`;
  }

  setEvent() {
    this.on(
      { target: '.result-modal-header__close-button', eventName: 'click' },
      this.#close.bind(this),
    );
    this.on({ target: '.result-modal-backdrop', eventName: 'click' }, this.#close.bind(this));
    this.on({ target: '.result-modal__reset-button', eventName: 'click' }, this.#close.bind(this));
  }

  #open() {
    this.querySelector('.result-modal-body').classList.remove('hidden');
    this.querySelector('.result-modal-backdrop').classList.remove('hidden');
  }
  #close() {
    this.querySelector('.result-modal-body').classList.add('hidden');
    this.querySelector('.result-modal-backdrop').classList.add('hidden');
  }
}
customElements.define('result-modal', ResultModal);
