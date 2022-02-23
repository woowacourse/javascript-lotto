import { $ } from '../utils/utils.js';
import { validator } from '../utils/validator.js';

export default class View {
  constructor($target) {
    this.$target = $target;

    this.init();
  }

  init() {
    this.render();
    this.cacheDOMElements();
    console.log('view loaded...');
  }

  cacheDOMElements() {
    this.$paymentInput = $('#payment-input');
    this.$paymentSubmit = $('#payment-submit');
  }

  bindEventListener(type, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);

    this.$target.addEventListener(type, (e) => {
      if (!isTarget(e.target)) return;

      e.preventDefault();
      callback(e);
    });
  }

  bindOnClickPaymentSubmit(callback) {
    this.bindEventListener('click', '#payment-submit', () => {
      const amount = this.$paymentInput.valueAsNumber;

      try {
        validator.checkChargeAmount(amount);
        callback(amount);
      } catch (e) {
        alert(e);
      }
    });
  }

  render(message) {
    this.$target.innerHTML = `
      <h4 id="title">🎱 행운의 로또</h4>
      <section id="payment-section">
        <label>구입할 금액을 입력해주세요.</label>
        <form>
          <input type="number" id="payment-input" />
          <button id="payment-submit">구입</button>
        </form>
      </section>
      <section id="ticket-section">
        <div>
          <label>총 <span>7</span>개를 구매하였습니다.</label>
          <ul id="ticket-list" class="ticket-list-column">
            <li class="ticket">
              <p>🎟<span class="ticket-numbers">1, 2, 3, 4, 5, 6</span></p>
            </li>
            <li class="ticket">
              <p>🎟</p>
            </li>
            <li class="ticket">
              <p>🎟</p>
            </li>
            <li class="ticket">
              <p>🎟</p>
            </li>
            <li class="ticket">
              <p>🎟</p>
            </li>
            <li class="ticket">
              <p>🎟</p>
            </li>
            <li class="ticket">
              <p>🎟</p>
            </li>
          </ul>
        </div>
        <div id="show-number-toggle-area">
          <label for="">번호 보기</label>
          <label class="switch">
            <input id="slider" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </section>
      <section id="winning-number-section">
        <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
        <fieldset id="winning-number-fieldset">
          <form id="winning-number-form">
            <label for="">당첨 번호</label>
            <div id="winning-number-input-wrap">
              <input class="winning-number-input" type="text" />
              <input class="winning-number-input" type="text" />
              <input class="winning-number-input" type="text" />
              <input class="winning-number-input" type="text" />
              <input class="winning-number-input" type="text" />
              <input class="winning-number-input" type="text" />
            </div>
          </form>
          <form id="bonus-number-form">
            <label for="">보너스 번호</label>
            <input class="winning-number-input" type="text" />
          </form>
        </fieldset>
        <button id="show-result-button">결과 확인하기</button>
      </section>
    `;
  }
}
