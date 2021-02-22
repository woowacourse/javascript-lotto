import {
  ACTION_TYPE,
  ALERT_MESSAGE,
  CLASSNAME,
  JS_SELECTOR,
  STATE_TYPE,
} from "../constants/index.js";
import { EmptyInputError, ValidationError } from "../errors/index.js";
import { Lotto } from "../models/index.js";
import store from "../store/index.js";
import {
  $,
  $$,
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../utils/index.js";

const createWinningNumberContainer = () => {
  const $container = $(toDAS(JS_SELECTOR.WINNING_NUMBER.CONTAINER));
  const $$inputs = $$(toCS(CLASSNAME.WINNING_NUMBER.INPUT), {
    $parent: $container,
  });
  const $bonusInput = $(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT), {
    $parent: $container,
  });

  const toNumbers = ($$inputs, $bonusInput) => {
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
  };

  const validate = (numbers, bonusNumber) => {
    const numbersSet = new Set([...numbers, bonusNumber]);

    if (numbersSet.size < numbers.length + 1) {
      throw new ValidationError(
        ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.DUPLICATED
      );
    }

    if (
      [...numbersSet].some((number) => {
        return (
          Number.isInteger(number) &&
          number < Lotto.MIN_NUMBER &&
          Lotto.MAX_NUMBER < number
        );
      })
    ) {
      throw new ValidationError(
        ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.OUT_OF_RANGE
      );
    }
  };

  const getWinningNumberWithValidation = (event) => {
    event.preventDefault();

    try {
      const [numbers, bonusNumber] = toNumbers($$inputs, $bonusInput);

      validate(numbers, bonusNumber);

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
  };

  const render = () => {
    const { lottos } = store.getState();
    if (lottos && $container.classList.contains(CLASSNAME.COMMON.HIDDEN)) {
      $container.show();
    }
  };

  const init = () => {
    $container.addEventListener("submit", getWinningNumberWithValidation);
    store.subscribe(STATE_TYPE.LOTTOS, render);
  };

  return { init };
};

const WinningNumberContainer = createWinningNumberContainer();

export default WinningNumberContainer;
