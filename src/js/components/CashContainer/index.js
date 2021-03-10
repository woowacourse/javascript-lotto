import {
  ACTION_TYPE,
  ALERT_MESSAGE,
  JS_SELECTOR,
} from "../../constants/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";
import { Lotto } from "../../models/index.js";
import { EmptyInputError, ValidationError } from "../../errors/index.js";
import { Container } from "../core/index.js";
import CashPresentational from "./Presentational.js";
class CashContainer extends Container {
  constructor() {
    super(CashPresentational);
  }

  initalize() {
    this.$cashInput = $(toDAS(JS_SELECTOR.CASH.INPUT));
  }

  getEventListeners() {
    return {
      createLottosAfterValidation: this.createLottosAfterValidation.bind(this),
    };
  }

  select() {
    const state = this.store.getState();
    return state.lottos;
  }

  render() {
    if (!this.hasChanged()) return;

    this.Presentational.render();
    this.updateValue();
  }

  createLottosAfterValidation(event) {
    event.preventDefault();

    const { isPurchasing } = this.store.getState();
    if (isPurchasing) return;

    try {
      const cash = this.toNumber(this.$cashInput.value);
      this.validate(cash);

      this.store.dispatch({
        type: ACTION_TYPE.LOTTOS.ADDING,
        payload: cash,
      });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof EmptyInputError
      ) {
        alert(error.message);
        this.$cashInput.clear();
        this.$cashInput.focus();
        return;
      }

      throw error;
    }
  }

  toNumber(cashInputValue) {
    if (cashInputValue === "") {
      throw new EmptyInputError(ALERT_MESSAGE.ERROR.CASH_INPUT.NOT_A_NUMBER);
    }

    return Number(cashInputValue);
  }

  validate(cash) {
    if (cash < Lotto.UNIT_PRICE) {
      throw new ValidationError(
        ALERT_MESSAGE.ERROR.CASH_INPUT.UNDER_LOTTO_PRICE
      );
    }
  }
}

export default CashContainer;
