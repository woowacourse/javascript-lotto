import {
  ACTION_TYPE,
  ALERT_MESSAGE,
  CLASSNAME,
} from "../../constants/index.js";
import { EmptyInputError, ValidationError } from "../../errors/index.js";
import { Lotto } from "../../models/index.js";
import store from "../../store/index.js";
import { $, $$, toClassSelector as toCS } from "../../utils/index.js";
import WinningNumberPresentational from "./Presentational.js";
import { Container } from "../core/index.js";

class WinningNumberContainer extends Container {
  constructor() {
    super();
    this.Presentational = new WinningNumberPresentational({
      eventListeners: {
        getWinningNumberWithValidation: this.getWinningNumberWithValidation.bind(
          this
        ),
      },
    });
  }

  initalize() {
    this.$$inputs = $$(toCS(CLASSNAME.WINNING_NUMBER.INPUT));
    this.$bonusInput = $(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT));
  }

  select() {
    const state = store.getState();
    return state.lottos;
  }

  render() {
    if (!this.hasChanged()) return;

    this.Presentational.render({
      isLottoInitialAdded: this.previousValue.length === 0,
      isLottoCleared: this.currentValue.length === 0,
    });

    this.updateValue();
  }

  getWinningNumberWithValidation(event) {
    event.preventDefault();

    try {
      const [numbers, bonusNumber] = this.toNumbers(
        this.$$inputs,
        this.$bonusInput
      );

      this.validate(numbers, bonusNumber);

      store.dispatch({
        type: ACTION_TYPE.WINNING_NUMBERS.SET,
        payload: {
          numbers,
          bonusNumber,
        },
      });
    } catch (error) {
      if (
        error instanceof EmptyInputError ||
        error instanceof ValidationError
      ) {
        alert(error.message);
        return;
      }

      throw error;
    }
  }

  toNumbers($$inputs, $bonusInput) {
    const inputs = [...$$inputs];

    if (inputs.some(($input) => $input.isEmpty()) || $bonusInput.isEmpty()) {
      throw new EmptyInputError(
        ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.EMPTY
      );
    }

    const numbers = inputs
      .map(($input) => Number($input.value))
      .sort((a, b) => a - b);
    const bonusNumber = Number($bonusInput.value);

    return [numbers, bonusNumber];
  }

  validate(numbers, bonusNumber) {
    const numbersSet = new Set([...numbers, bonusNumber]);

    if (numbersSet.size < numbers.length + 1) {
      throw new ValidationError(
        ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.DUPLICATED
      );
    }

    if (
      [...numbersSet].some((number) => {
        return (
          !Number.isInteger(number) ||
          number < Lotto.MIN_NUMBER ||
          number > Lotto.MAX_NUMBER
        );
      })
    ) {
      throw new ValidationError(
        ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.OUT_OF_RANGE
      );
    }
  }
}

export default WinningNumberContainer;
