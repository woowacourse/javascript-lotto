import { $, hide, show } from '../utils/DOM.js';
import { REMAINING_QUANTITY_TO_PURCHASE_MESSAGE } from '../constants.js';

export default class ManualLottoPurchaseInput {
  constructor({ isVisible, numOfLotto, updateLottoTickets }) {
    this.$container = $('.manual-lotto-purchase-section');
    this.$remainingCount = $('.remaining-count');

    this.isVisible = isVisible;
    this.numOfLotto = numOfLotto;
    this.manualLottoTickets = [];
    this.updateLottoTickets = updateLottoTickets;
  }

  setState({ isVisible, numOfLotto }) {
    this.isVisible = isVisible ?? this.isVisible;
    this.numOfLotto = numOfLotto ?? this.numOfLotto;

    this.render();
  }

  render() {
    if (!this.isVisible) {
      hide(this.$container);

      return;
    }

    show(this.$container);
    this.$remainingCount.innerText = REMAINING_QUANTITY_TO_PURCHASE_MESSAGE(
      this.numOfLotto - this.manualLottoTickets.length,
      this.numOfLotto
    );
  }
}
