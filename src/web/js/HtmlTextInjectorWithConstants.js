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

    const inputEl = document.querySelector('#input-paymentAmount');

    inputEl.setAttribute('min', min);
    inputEl.setAttribute('max', max);
    inputEl.setAttribute('step', price);
  },

  private_makeInputForWinningLottoNumbers() {
    const { start, end } = LOTTO_RULE.range;

    const inputGroupEl = document.querySelector(
      '.winningCriteria__form_lottoNumbers .input-group',
    );

    const labelTextContent = '당첨 번호를 입력해주세요.';

    Array.from({ length: LOTTO_RULE.length }).forEach((_, index) => {
      const labelEl = document.createElement('label');
      const inputEl = document.createElement('input');

      const inputElId = `input-lottoNumber${index + 1}`;

      labelEl.setAttribute('for', inputElId);
      labelEl.className = 'screen-reader-only';
      labelEl.textContent = labelTextContent;

      inputEl.id = inputElId;
      inputEl.setAttribute('type', 'number');
      inputEl.setAttribute('min', start);
      inputEl.setAttribute('max', end);
      inputEl.name = inputElId.replace('input-', '');

      inputGroupEl.appendChild(labelEl);
      inputGroupEl.appendChild(inputEl);
    });
  },

  private_setNumberRangeOfBonusInput() {
    const { start, end } = LOTTO_RULE.range;

    const bonusInput = document.querySelector('#input-bonusNumber');

    bonusInput.setAttribute('min', start);
    bonusInput.setAttribute('max', end);
  },
  private_setTextContentAboutPrize() {
    WINNING_RULE.forEach((value, key) => {
      const trEl = document.querySelector(`#rank${key}`);
      const prizeEl = trEl.querySelector('.prize');

      prizeEl.textContent = value.money.toLocaleString('ko-KR');
    });
  },
  // rule
  private_setTextContentAboutPaymentAmountRule() {
    this.private_setTextContentAboutLottoPrice();
    this.private_setTextContentAboutRangeOfIssuedLotto();
  },

  private_setTextContentAboutLottoPrice() {
    const { price } = LOTTO_RULE;
    const lottoPriceElList = document.querySelectorAll(
      '.paymentAmount__rule-lottoPrice',
    );

    lottoPriceElList.forEach((element) => {
      // eslint-disable-next-line
      element.textContent = price.toLocaleString('ko-KR');
    });
  },

  private_setTextContentAboutRangeOfIssuedLotto() {
    const { min, max } = LOTTO_RULE.numbersOfTickets;

    const minEl = document.querySelector(
      '#paymentAmount__rule-minNumberOfTickets',
    );
    const maxEl = document.querySelector(
      '#paymentAmount__rule-maxNumberOfTickets',
    );

    minEl.textContent = min;
    maxEl.textContent = max;
  },
  // 로또, 보너스 번호
  private_setTextContentAboutWinningCriteria() {
    this.private_setTextContentAboutLottoNumber();
    this.private_setTextContentAboutNumbersOfLotto();
  },

  private_setTextContentAboutLottoNumber() {
    const { start, end } = RANDOM_NUMBER_RULE.range;

    const startEl = document.querySelector(
      '#winningCriteria__rule-startNumberOfLotto',
    );
    const endEl = document.querySelector(
      '#winningCriteria__rule-endNumberOfLotto',
    );

    startEl.textContent = start;
    endEl.textContent = end;
  },

  private_setTextContentAboutNumbersOfLotto() {
    const { length } = LOTTO_RULE;

    const numbersOfLottoEl = document.querySelector(
      '#winningCriteria__rule-numbersOfLotto',
    );

    numbersOfLottoEl.textContent = length;
  },
};

export default HtmlTextInjectorWithConstants;
