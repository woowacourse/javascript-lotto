import { $ } from '../utils/utils.js';
import { validator } from '../utils/validator.js';

export default class View {
  state;

  constructor($target) {
    this.$target = $target;
    this.init();
    this.render();
  }

  init() {
    this.state = {
      isShowNumber: false,
      lottoList: [],
    };
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

  bindOnClickNumberToggle() {
    this.bindEventListener('click', '#slider', () => {
      const { isShowNumber } = this.state;
      this.update({ isShowNumber: !isShowNumber });
    });
  }

  update(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.cacheDOMElements();
  }

  template() {
    const { lottoList, isShowNumber } = this.state;

    return `
    <h4 id="title">🎱 행운의 로또</h4>
    <section id="payment-section">
      <label>구입할 금액을 입력해주세요.</label>
      <form>
        <input type="number" id="payment-input" />
        <button id="payment-submit">구입</button>
      </form>
    </section>
    <section id="ticket-section">
      <div id="ticket-list-wrap">
        <label>총 <span>${lottoList.length}</span>개를 구매하였습니다.</label>
        <ul id="ticket-list" class="${
          (isShowNumber && 'ticket-list-column') || 'ticket-list-row'
        }">
          ${lottoList
            .map(
              (lotto) =>
                `<li class="ticket">
                <p>🎟
                ${
                  (isShowNumber &&
                    `<span class="ticket-numbers">${lotto
                      .getNumbers()
                      .join(', ')}</span>`) ||
                  ''
                }
                
                </p>
                </li>`
            )
            .join('')}
        </ul>
      </div>
      <div id="show-number-toggle-area">
        <label for="slider">번호 보기</label>
        <label class="switch">
          <input id="slider" type="checkbox" ${isShowNumber ? 'checked' : ''}/>
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
