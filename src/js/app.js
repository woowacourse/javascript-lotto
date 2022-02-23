import { isPositiveInteger, isDivisibleBy } from './utils';
import { DOM_STRING, SELECTOR, MONEY } from './constants';
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

  main() {
    this.bindEventListener('click', SELECTOR.$PAYMENT_BUTTON, () => {
      const $paymentInput = document.querySelector(SELECTOR.$PAYMENT_INPUT);
      try {
        this.purchasedLottoCount = isDivisibleBy(
          isPositiveInteger($paymentInput.valueAsNumber),
          MONEY.STANDARD
        );

        document.querySelector(SELECTOR.$PAYMENT_BUTTON).disabled =
          !document.querySelector(SELECTOR.$PAYMENT_BUTTON).disabled;
        document
          .querySelector(SELECTOR.$PAYMENT_BUTTON)
          .classList.toggle(DOM_STRING.DISABLED);

        document.querySelector(SELECTOR.$PAYMENT_INPUT).disabled =
          !document.querySelector(SELECTOR.$PAYMENT_INPUT).disabled;

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

    this.bindEventListener('click', SELECTOR.$LOTTO_LIST_TOGGLE_BUTTON, () => {
      document
        .querySelector(SELECTOR.$LOTTO_LIST_TOGGLE_BUTTON)
        .classList.toggle(DOM_STRING.TOGGLE_SWITCH);

      document
        .querySelector(SELECTOR.$LOTTO_LIST)
        .classList.toggle(DOM_STRING.DIRECTION_COLUMN);

      document.querySelectorAll(SELECTOR.$LOTTO).forEach((element) => {
        element.classList.toggle(DOM_STRING.DISPLAY_FLEX);
      });

      document.querySelectorAll(SELECTOR.$LOTTO_NUMBER).forEach((element) => {
        element.classList.toggle(DOM_STRING.INVISIBLE);
      });
    });
  }
}
