import { LOTTO_RULE, WINNING_RULE } from '../../constants/index.js';

const HtmlTextInjectorWithConstants = {
  injectorText() {
    this.private_setNumberRangeOfPaymentAmountInput();
    this.private_makeInputForWinningLottoNumbers();
    this.private_setNumberRangeOfBonusInput();
    this.private_editPrizeAndCountText();
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

    const winningLottoCriteriaEl = document.querySelector(
      '.winningCriteria_lotto',
    );
    const inputGroupEl = winningLottoCriteriaEl.querySelector('.input-group');

    const labelTextContent = '당첨 번호를 입력해주세요.';

    Array.from({ length: LOTTO_RULE.length }).forEach((_, index) => {
      const labelEl = document.createElement('label');
      const inputEl = document.createElement('input');

      const inputElId = `input-lottoNumber${index + 1}`;

      labelEl.setAttribute('for', inputElId);
      labelEl.className = 'hidden';
      labelEl.textContent = labelTextContent;

      inputEl.id = inputElId;
      inputEl.setAttribute('type', 'number');
      inputEl.setAttribute('min', start);
      inputEl.setAttribute('max', end);

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

  private_editPrizeAndCountText() {
    WINNING_RULE.forEach((value, key) => {
      const trEl = document.querySelector(`#rank${key}`);
      const prizeEl = trEl.querySelector('.prize');

      prizeEl.textContent = value.money.toLocaleString('ko-KR');
    });
  },
};

HtmlTextInjectorWithConstants.injectorText();
