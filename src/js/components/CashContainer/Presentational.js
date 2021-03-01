import { ALERT_MESSAGE, JS_SELECTOR } from "../../constants/index.js";
import {
  NotAnIntegerError,
  NotANumberError,
  OutOfRangeError,
} from "../../errors/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";

const createPresentaional = () => {
  const $cashContainer = $(toDAS(JS_SELECTOR.CASH.CONTAINER));
  const $cashInput = $(toDAS(JS_SELECTOR.CASH.INPUT));

  const notifyError = (error) => {
    $cashInput.clear();
    $cashInput.focus();

    if (error instanceof NotANumberError) {
      alert(`${error.message} ${ALERT_MESSAGE.ERROR.CASH_INPUT.NOT_A_NUMBER}`);
      return;
    }

    if (error instanceof NotAnIntegerError) {
      alert(
        `${error.message} ${ALERT_MESSAGE.ERROR.CASH_INPUT.NOT_AN_INTEGER}`
      );
      return;
    }

    if (error instanceof OutOfRangeError) {
      alert(`${error.message} ${ALERT_MESSAGE.ERROR.CASH_INPUT.OUT_OF_RANGE}`);
      return;
    }
  };

  const render = () => {
    $cashInput.clear();
    $cashInput.focus();
  };

  const init = (createAction) => {
    $cashContainer.addEventListener("submit", createAction);
  };

  return { init, render, notifyError };
};

const Presentational = createPresentaional();

export default Presentational;
