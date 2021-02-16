import { LOTTO_PRICE } from '../utils/constants.js';
import { $ } from '../utils/dom.js';
import { mod, divide } from '../utils/lotto.js';

// TODO: 최대금액 설정

export default class LottoPerchaseInput {
  constructor(props) {
    this.props = props;

    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$perchaseInput = $('#lotto-perchase-input');
    this.$perchaseButton = $('#lotto-perchase-btn');
  }

  bindEvent() {
    this.$perchaseButton.addEventListener(
      'click',
      this.perchaseButtonClickHandler.bind(this),
    );
  }

  perchaseButtonClickHandler() {
    const perchaseInputValue = this.$perchaseInput.value.trim();
    const payment = Number(perchaseInputValue);

    const errorMessage = validatePerchaseInputValue(payment);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const lottoCount = divide(payment, LOTTO_PRICE);
    const remainingMoney = mod(payment, LOTTO_PRICE);
    alert(`로또 ${lottoCount}개 구매 완료. 거스름돈 : ${remainingMoney}원`);
  }
}

const validatePerchaseInputValue = payment => {
  if (!Number.isInteger(payment)) {
    return `소수를 입력하셨습니다. 입력 금액은 정수여야 합니다.`;
  }

  if (payment < LOTTO_PRICE) {
    return `${LOTTO_PRICE}원 이상의 금액만 입력할 수 있습니다.`;
  }
};
