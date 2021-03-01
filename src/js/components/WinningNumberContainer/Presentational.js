import {
  ALERT_MESSAGE,
  CLASSNAME,
  JS_SELECTOR,
} from "../../constants/index.js";
import {
  DuplicatedNumbersError,
  NotAnIntegerError,
  NotANumberError,
  OutOfRangeError,
} from "../../errors/index.js";
import {
  $,
  $$,
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../utils/index.js";

const createPresentaional = () => {
  const $container = $(toDAS(JS_SELECTOR.WINNING_NUMBER.CONTAINER));
  const $$inputs = $$(toCS(CLASSNAME.WINNING_NUMBER.INPUT));
  const $bonusInput = $(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT));

  const clear = () => {
    $$inputs.forEach(($input) => $input.clear());
    $bonusInput.clear();
    $container.hide();
  };

  const render = ({ isLottoInitialAdded, isLottoCleared }) => {
    if (isLottoInitialAdded) {
      $container.show();
      return;
    }

    if (isLottoCleared) {
      clear();
      return;
    }
  };

  const notifyError = (error) => {
    if (error instanceof NotANumberError) {
      alert(
        `${error.message} ${ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.NOT_A_NUMBER}`
      );
      return;
    }

    if (error instanceof NotAnIntegerError) {
      alert(
        `${error.message} ${ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.NOT_AN_INTEGER}`
      );
      return;
    }

    if (error instanceof OutOfRangeError) {
      alert(
        `${error.message} ${ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.OUT_OF_RANGE}`
      );
      return;
    }

    if (error instanceof DuplicatedNumbersError) {
      alert(
        `${error.message} ${ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.DUPLICATED}`
      );
      return;
    }
  };

  const init = (eventHandler) => {
    $container.addEventListener("submit", eventHandler);
  };

  return { init, render, notifyError };
};

const Presentaional = createPresentaional();

export default Presentaional;
