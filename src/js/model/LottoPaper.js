import { LOTTO_PAPER_CHECK_MESSAGE } from '../constants/display.js';
import { LOTTO_NUMBERS_LENGTH, DEFAULT_MANUAL_QUANTITY } from '../constants/lottoRules.js';
import { getApplyQuantitySelectHTML } from '../layouts/selectPaper.js';
import { getNthElementRemoved } from '../utils/general.js';

export default class LottoPaper {
  constructor(issueNum) {
    this.issueNum = issueNum;
    this.numbers = [];
    this.quantity = DEFAULT_MANUAL_QUANTITY;
    this.maxQuantity = 0;
    this.isFulfilled = false;
    this.$checkMessage = null;
    this.$quantitySelect = null;
  }

  add(number) {
    this.setState({ numbers: [...this.numbers, number] });
  }

  remove(number) {
    const index = this.numbers.indexOf(number);

    this.setState({ numbers: getNthElementRemoved(this.numbers, index) });
  }

  setState({ numbers, quantity, maxQuantity, $checkMessage, $quantitySelect }) {
    if (numbers) {
      this.numbers = numbers.sort((a, b) => a - b);
      this.isFulfilled = this.numbers.length === LOTTO_NUMBERS_LENGTH;
      this.renderCheckMessage();
    }
    if (maxQuantity && this.$quantitySelect) {
      this.renderQuantitySelect(maxQuantity);
      this.maxQuantity = maxQuantity;
    }
    this.quantity = quantity ?? this.quantity;
    this.$checkMessage = $checkMessage ?? this.$checkMessage;
    this.$quantitySelect = $quantitySelect ?? this.$quantitySelect;
  }

  renderQuantitySelect(maxQuantity) {
    const diff = maxQuantity - this.maxQuantity;

    if (diff === 0) {
      return;
    }
    if (diff > 0) {
      [...Array(diff)].forEach((_, i) =>
        this.$quantitySelect.insertAdjacentHTML(
          'beforeEnd',
          getApplyQuantitySelectHTML({ quantity: this.maxQuantity + 1 + i })
        )
      );
      return;
    }
    this.$quantitySelect.querySelectorAll('option').forEach(($option, i) => {
      if (i + 1 > maxQuantity) {
        $option.remove();
      }
    });
  }

  renderCheckMessage() {
    this.$checkMessage.innerText = this.isFulfilled
      ? LOTTO_PAPER_CHECK_MESSAGE.CANNOT_SELECT_MORE
      : LOTTO_PAPER_CHECK_MESSAGE.NEED_TO_SELECT_MORE(LOTTO_NUMBERS_LENGTH - this.numbers.length);
  }
}
