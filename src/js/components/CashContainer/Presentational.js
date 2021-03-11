import { JS_SELECTOR } from "../../constants/index.js";
import {
  $,
  notify,
  toDataAttributeSelector as toDAS,
} from "../../utils/index.js";

const createPresentaional = () => {
  const $cashContainer = $(toDAS(JS_SELECTOR.CASH.CONTAINER));
  const $cashInput = $(toDAS(JS_SELECTOR.CASH.INPUT));

  const notifyError = (message) => {
    $cashInput.clear();
    $cashInput.focus();

    notify(message);
    return;
  };

  const render = () => {
    $cashInput.clear();
  };

  const init = (createAction) => {
    $cashContainer.addEventListener("submit", createAction);
  };

  return { init, render, notifyError };
};

const Presentational = createPresentaional();

export default Presentational;
