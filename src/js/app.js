import { isPositiveInteger, isDivisibleBy } from './utils';
import Lotto from './Lotto';
import template from './templates';

export default class LottoApp {
  constructor(app) {
    this.$app = document.querySelector(app);
    this.$app.insertAdjacentHTML('beforeend', template.paymentSection);

    this.purchasedLottoCount = 0;
    this.purchasedLottoList = [];
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
        this.purchasedLottoCount = isDivisibleBy(
          isPositiveInteger($paymentInput.valueAsNumber),
          1000
        );

        document.querySelector('#payment-button').disabled =
          !document.querySelector('#payment-button').disabled;
        document.querySelector('#payment-button').classList.toggle('disabled');

        document.querySelector('#payment-input').disabled =
          !document.querySelector('#payment-input').disabled;

        for (let i = 0; i < this.purchasedLottoCount; i++) {
          const lotto = new Lotto();
          lotto.setLotto();
          this.purchasedLottoList.push(lotto.getLotto());
        }

        this.$app.insertAdjacentHTML(
          'beforeend',
          template.purchasedSection(this.purchasedLottoList)
        );

        this.$app.insertAdjacentHTML(
          'beforeend',
          template.lastWeekWinningNumberSection
        );

        this.$app.insertAdjacentHTML(
          'beforeend',
          template.resultCheckingSection
        );
      } catch (error) {
        alert(error.message);
        $paymentInput.value = '';
        $paymentInput.focus();
      }
    });

    this.bindEventListener('click', '#lotto-list-toggle-button', () => {
      // toggle 기능 구현 하면될 듯
      document
        .querySelector('#lotto-list-toggle-button')
        .classList.toggle('toggle-switch');

      document
        .querySelector('#lotto-list')
        .classList.toggle('direction-column');

      document.querySelectorAll('.lotto').forEach((element) => {
        element.classList.toggle('display-flex');
      });

      document.querySelectorAll('.lotto-number').forEach((element) => {
        element.classList.toggle('invisible');
      });
    });
  }
}
