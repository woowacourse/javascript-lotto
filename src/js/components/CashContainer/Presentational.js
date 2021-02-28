import { JS_SELECTOR } from "../../constants/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";

const createPresentaional = () => {
  const $cashContainer = $(toDAS(JS_SELECTOR.CASH.CONTAINER));
  const $cashInput = $(toDAS(JS_SELECTOR.CASH.INPUT));

  const render = () => {
    $cashInput.clear();
    $cashInput.focus();
  };

  const init = ({ createLottosAfterValidation }) => {
    $cashContainer.addEventListener("submit", createLottosAfterValidation);
  };

  return { init, render };
};

const Presentational = createPresentaional();

export default Presentational;
