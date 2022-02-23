import { isPositiveInteger, isDivisibleBy } from './utils';

const paymentSection = `<section id="payment-section">
<h2 hidden>구입할 금액</h2>
<label for="payment-input">구입할 금액을 입력해주세요.</label>
<form class="payment-form">
  <input name="payment-input" id="payment-input" type="number" placeholder="금액" />
  <button id="payment-button">구입</button>
</form>
</section>`;

const purchasedSection = (resultInput) => `
<section id="purchased-lotto-list-section">
      <h2 hidden>구입한 로또 목록</h2>
      <div class="lotto-list-container">
        <p class="purchased-total-count">총 ${resultInput}개를 구매하였습니다.</p>
        <ul id="lotto-list">
          ${'<li class="lotto">🎟️</li>'.repeat(resultInput)}
        </ul>
      </div>
      <div class="lotto-list-toggle-container">
        <p>번호 보기</p>
        <button id="lotto-list-toggle-button"></button>
      </div>
    </section>
`;

export default class LottoApp {
  constructor(app) {
    this.$app = document.querySelector(app);
    this.$app.insertAdjacentHTML('beforeend', paymentSection);

    this.main();
  }

  bindEventListener(type, selector, callback) {
    const children = [...document.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);

    this.$app.addEventListener(type, (e) => {
      if (!isTarget(e.target)) return;

      e.preventDefault();
      callback(e);
    });
  }

  // purchased section
  main() {
    this.bindEventListener('click', '#payment-button', () => {
      const $paymentInput = document.querySelector('#payment-input');
      try {
        const resultInput = isDivisibleBy(
          isPositiveInteger($paymentInput.valueAsNumber),
          1000
        );

        this.$app.insertAdjacentHTML(
          'beforeend',
          purchasedSection(resultInput)
        );
      } catch (error) {
        console.error(error);
      }
    });
  }
}
