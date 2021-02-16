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

    const lottoCount = divide(payment, 1000);
    const remainingMoney = mod(payment, 1000);

    alert(`로또 ${lottoCount}개 구매 완료. 거스름돈 : ${remainingMoney}원`);
  }
}
