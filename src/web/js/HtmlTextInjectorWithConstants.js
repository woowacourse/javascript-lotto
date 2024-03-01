import { LOTTO_RULE, RANDOM_NUMBER_RULE } from '../../constants/index.js';

const HtmlTextInjectorWithConstants = {
  injectorText() {
    this.private_injectPaymentAmountInput();
    this.private_injectInputForWinningLottoNumbers();
    this.private_injectBonusInput();
    this.private_injectPaymentAmountRule();
    this.private_injectWinningCriteriaRule();
  },

  private_injectPaymentAmountInput() {
    const parentDivElement = document.querySelector(
      '.payment-amount__form div',
    );
    const { price, numbersOfTickets } = LOTTO_RULE;

    const maxPayment = price * numbersOfTickets.max;

    const attributes = {
      id: 'input-payment-amount',
      min: price * numbersOfTickets.min,
      max: maxPayment,
      step: price,
      type: 'number',
      name: 'paymentAmount',
      maxLength: maxPayment.toString().length,
      placeholder: '금액',
      required: true,
    };

    const paymentAmountInputElement = document.createElement('input');

    Object.entries(attributes).forEach(([key, value]) => {
      paymentAmountInputElement.setAttribute(key, value);
    });

    parentDivElement.insertBefore(
      paymentAmountInputElement,
      parentDivElement.firstChild,
    );
  },
  /**
   *
   * @param {DocumentFragment} fragment
   * @param {{type: string, min: number, max: number}} numberInputAttributes
   */
  private_makeLottoNumberInputAndLabel(fragment, numberInputAttributes) {
    Array.from({ length: LOTTO_RULE.length }).forEach((_, index) => {
      const labelElement = document.createElement('label');
      const numberInputElement = document.createElement('input');

      const inputElementId = `input-lottoNumber${index + 1}`;

      labelElement.setAttribute('for', inputElementId);
      labelElement.className = 'screen-reader-only';
      labelElement.textContent = '당첨 번호를 입력해주세요.';

      numberInputElement.id = inputElementId;

      Object.entries(numberInputAttributes).forEach(([key, value]) => {
        numberInputElement.setAttribute(key, value);
      });
      numberInputElement.name = inputElementId.replace('input-', '');

      fragment.appendChild(labelElement);
      fragment.appendChild(numberInputElement);
    });
  },

  private_injectInputForWinningLottoNumbers() {
    const { start, end } = LOTTO_RULE.range;

    const inputGroupElement = document.querySelector(
      '.winning-criteria__form-lotto-numbers .input-group',
    );
    const fragment = document.createDocumentFragment();

    const numberInputAttributes = {
      type: 'number',
      min: start,
      max: end,
      maxLength: end.toString().length,
    };

    this.private_makeLottoNumberInputAndLabel(fragment, numberInputAttributes);

    inputGroupElement.appendChild(fragment);
  },

  private_injectBonusInput() {
    const bonusFormElement = document.querySelector(
      '.winning-criteria__form-bonus-number',
    );
    const { start, end } = LOTTO_RULE.range;

    const bonusInput = document.createElement('input');

    const attributes = {
      id: 'input-bonus-number',
      min: start,
      max: end,
      maxLength: end.toString().length,
      type: 'number',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      bonusInput.setAttribute(key, value);
    });

    bonusFormElement.appendChild(bonusInput);
  },

  private_getPaymentAmountRuleHtml() {
    const { price } = LOTTO_RULE;
    const { min, max } = LOTTO_RULE.numbersOfTickets;

    return `
    <ul class="rule rule-payment-amount shadow ">
      <li>
        로또 가격은 ${price}원이에요.
      </li>
      <li>구매 금액은 ${price}원 단위로 입력해주세요.</li>
      <li>구매 가능한 로또는 최소 ${min}장, 최대 ${max}장이에요.</li>
    </ul>
    `;
  },

  private_injectPaymentAmountRule() {
    const parentElement = document.querySelector(
      '.payment-amount__explanation',
    );

    parentElement.insertAdjacentHTML(
      'beforeend',
      this.private_getPaymentAmountRuleHtml(),
    );
  },

  private_getWinningCriteriaRuleHtml() {
    const { start, end } = RANDOM_NUMBER_RULE.range;
    const { length } = LOTTO_RULE;

    return `
    <ul class="rule rule-winning-criteria shadow ">
      <li>번호는
        ${start}~${end}의 정수여야 해요.
      </li>
      <li>
        당첨 번호는 중복 없는 ${length}개 여야해요.
      </li>
      <li>보너스 번호는 당첨 번호와 중복되지 않아야해요. </li>
    </ul>
    `;
  },

  private_injectWinningCriteriaRule() {
    const parentElement = document.querySelector(
      '.winning-criteria__explanation',
    );

    const winningCriteriaRuleHtml = this.private_getWinningCriteriaRuleHtml();

    parentElement.insertAdjacentHTML('beforeend', winningCriteriaRuleHtml);
  },
};

export default HtmlTextInjectorWithConstants;
