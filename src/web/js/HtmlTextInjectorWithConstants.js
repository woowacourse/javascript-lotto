import {
  LOTTO_RULE,
  RANDOM_NUMBER_RULE,
  WINNING_RULE,
} from '../../constants/index.js';

const HtmlTextInjectorWithConstants = {
  injectorText() {
    this.private_setNumberRangeOfPaymentAmountInput();
    this.private_makeInputForWinningLottoNumbers();
    this.private_setNumberRangeOfBonusInput();
    this.private_setTextContentAboutPrize();
    this.private_setTextContentAboutPaymentAmountRule();
    this.private_setTextContentAboutWinningCriteria();
  },

  private_setNumberRangeOfPaymentAmountInput() {
    const { price, numbersOfTickets } = LOTTO_RULE;
    const max = price * numbersOfTickets.max;
    const min = price * numbersOfTickets.min;

    const inputElement = document.querySelector('#input-payment-amount');

    inputElement.setAttribute('min', min);
    inputElement.setAttribute('max', max);
    inputElement.setAttribute('step', price);
  },

  private_makeInputForWinningLottoNumbers() {
    const { start, end } = LOTTO_RULE.range;

    const inputGroupElement = document.querySelector(
      '.winning-criteria__form-lotto-numbers .input-group',
    );

    const labelTextContent = '당첨 번호를 입력해주세요.';

    Array.from({ length: LOTTO_RULE.length }).forEach((_, index) => {
      const labelElement = document.createElement('label');
      const inputElement = document.createElement('input');

      const inputElementId = `input-lottoNumber${index + 1}`;

      labelElement.setAttribute('for', inputElementId);
      labelElement.className = 'screen-reader-only';
      labelElement.textContent = labelTextContent;

      inputElement.id = inputElementId;
      inputElement.setAttribute('type', 'number');
      inputElement.setAttribute('min', start);
      inputElement.setAttribute('max', end);
      inputElement.name = inputElementId.replace('input-', '');

      inputGroupElement.appendChild(labelElement);
      inputGroupElement.appendChild(inputElement);
    });
  },

  private_setNumberRangeOfBonusInput() {
    const { start, end } = LOTTO_RULE.range;

    const bonusInput = document.querySelector('#input-bonus-number');

    bonusInput.setAttribute('min', start);
    bonusInput.setAttribute('max', end);
  },

  private_setTextContentAboutPrize() {
    WINNING_RULE.forEach((value, key) => {
      const trElement = document.querySelector(`#rank${key}`);
      const prizeElement = trElement.querySelector('.prize');

      prizeElement.textContent = value.money.toLocaleString('ko-KR');
    });
  },

  private_setTextContentAboutPaymentAmountRule() {
    this.private_setTextContentAboutLottoPrice();
    this.private_setTextContentAboutRangeOfIssuedLotto();
  },

  private_setTextContentAboutLottoPrice() {
    const { price } = LOTTO_RULE;
    const lottoPriceElementList = document.querySelectorAll(
      '.payment-amount__rule-lotto-price',
    );

    lottoPriceElementList.forEach((element) => {
      // eslint-disable-next-line
      element.textContent = price.toLocaleString('ko-KR');
    });
  },

  private_setTextContentAboutRangeOfIssuedLotto() {
    const { min, max } = LOTTO_RULE.numbersOfTickets;

    const minElement = document.querySelector(
      '#payment-amount__rule-min-number-of-tickets',
    );
    const maxElement = document.querySelector(
      '#payment-amount__rule-max-number-of-tickets',
    );

    minElement.textContent = min;
    maxElement.textContent = max;
  },

  private_setTextContentAboutWinningCriteria() {
    this.private_setTextContentAboutLottoNumber();
    this.private_setTextContentAboutNumbersOfLotto();
  },

  private_setTextContentAboutLottoNumber() {
    const { start, end } = RANDOM_NUMBER_RULE.range;

    const startElement = document.querySelector(
      '#winning-criteria__rule-start-number-of-lotto',
    );
    const endElement = document.querySelector(
      '#winning-criteria__rule-end-number-of-lotto',
    );

    startElement.textContent = start;
    endElement.textContent = end;
  },

  private_setTextContentAboutNumbersOfLotto() {
    const { length } = LOTTO_RULE;

    const numbersOfLottoElement = document.querySelector(
      '#winning-criteria__rule-numbers-of-lotto',
    );

    numbersOfLottoElement.textContent = length;
  },
};

export default HtmlTextInjectorWithConstants;
