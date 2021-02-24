import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import {
  $,
  $$,
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../utils/index.js";

const createPresentaional = () => {
  const $container = $(toDAS(JS_SELECTOR.WINNING_NUMBER.CONTAINER));
  const $$inputs = $$(toCS(CLASSNAME.WINNING_NUMBER.INPUT), {
    $parent: $container,
  });
  const $bonusInput = $(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT), {
    $parent: $container,
  });

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

  const init = (eventHandler) => {
    $container.addEventListener("submit", eventHandler);
  };

  return { init, render };
};

const Presentaional = createPresentaional();

export default Presentaional;
