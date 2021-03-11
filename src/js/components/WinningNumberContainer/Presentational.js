import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";

import {
  $,
  $$,
  notify,
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../utils/index.js";

const createPresentaional = () => {
  const $container = $(toDAS(JS_SELECTOR.WINNING_NUMBER.CONTAINER));
  const $$inputs = $$(toCS(CLASSNAME.WINNING_NUMBER.INPUT));
  const $bonusInput = $(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT));

  const render = ({ isLottoInitialAdded, isLottoCleared }) => {
    if (isLottoInitialAdded) {
      $container.show();
      return;
    }

    if (isLottoCleared) {
      $$inputs.forEach(($input) => $input.clear());
      $bonusInput.clear();
      $container.hide();
      return;
    }
  };

  const notifyError = (message) => {
    notify(message);
  };

  const init = (createAction) => {
    $container.addEventListener("submit", createAction);
  };

  return { init, render, notifyError };
};

const Presentaional = createPresentaional();

export default Presentaional;
