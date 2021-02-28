import { LOTTO_PAPER_CHECK_MESSAGE } from '../constants/display.js';
import { LOTTO_NUMBERS_LENGTH, DEFAULT_MANUAL_QUANTITY } from '../constants/lottoRules.js';
import { getNthElementRemoved } from '../utils/general.js';

export default class LottoPaper {
  constructor(issueNum) {
    this.issueNum = issueNum;
    this.numbers = [];
    this.quantity = DEFAULT_MANUAL_QUANTITY;
    this.isFulfilled = false;
    this.$checkMessage = null;
  }

  add(number) {
    this.setState({ numbers: [...this.numbers, number] });
  }

  remove(number) {
    const index = this.numbers.indexOf(number);

    this.setState({ numbers: getNthElementRemoved(this.numbers, index) });
  }

  setState({ numbers, quantity, $checkMessage }) {
    if (numbers) {
      this.numbers = numbers.sort((a, b) => a - b);
      this.isFulfilled = this.numbers.length === LOTTO_NUMBERS_LENGTH;
      this.renderCheckMessage();
    }
    this.quantity = quantity ?? this.quantity;
    this.$checkMessage = $checkMessage ?? this.$checkMessage;
  }

  renderCheckMessage() {
    this.$checkMessage.innerText = this.isFulfilled
      ? LOTTO_PAPER_CHECK_MESSAGE.CANNOT_SELECT_MORE
      : LOTTO_PAPER_CHECK_MESSAGE.NEED_TO_SELECT_MORE(LOTTO_NUMBERS_LENGTH - this.numbers.length);
  }
}
