import { JS_SELECTOR } from "../../constants/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";
import { Presentational } from "../core/index.js";

class CashPresentational extends Presentational {
  constructor(eventListeners) {
    super(eventListeners);
  }

  initalize() {
    this.$cashContainer = $(toDAS(JS_SELECTOR.CASH.CONTAINER));
    this.$cashInput = $(toDAS(JS_SELECTOR.CASH.INPUT));
  }

  setEventListeners() {
    const { createLottosAfterValidation } = this.eventListeners;

    this.$cashContainer.addEventListener("submit", createLottosAfterValidation);
  }

  render() {
    this.$cashInput.clear();
    this.$cashInput.focus();
  }
}

export default CashPresentational;
