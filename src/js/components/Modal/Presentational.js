import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import {
  $,
  $$,
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../utils/index.js";

const TEMPLATE = (profitRate) =>
  `당신의 총 수익률은 ${profitRate.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}입니다.`;

const createPresentational = () => {
  const $container = $(toCS(CLASSNAME.MODAL));
  const $close = $(toCS(CLASSNAME.MODAL.CLOSE));
  const $restartButton = $(toDAS(JS_SELECTOR.MODAL.RESTART_BUTTON));
  const $profitRateParagraph = $(
    toDAS(JS_SELECTOR.MODAL.PROFIT_RATE_PARAGRAPH)
  );
  const $$winningCounts = Array.from(
    $$(toDAS(JS_SELECTOR.MODAL.WINNING_COUNT))
  );

  const closeModal = () => {
    $container.hide();
  };

  const closeModalIfDimmedClicked = (event) => {
    if (event.target.classList.contains(CLASSNAME.MODAL)) {
      closeModal();
    }
  };

  const render = ({ isCleared = false, winningCounts, profitRate }) => {
    if (isCleared) {
      $container.hide();
      return;
    }

    Array.from($$winningCounts)
      .reverse()
      .forEach(($td, index) => {
        $td.innerText = `${winningCounts[index]}개`;
      });
    $profitRateParagraph.innerText = TEMPLATE(profitRate);
    $container.show();
  };

  const init = (createAction) => {
    $close.addEventListener("click", closeModal);
    $container.addEventListener("click", closeModalIfDimmedClicked);
    $restartButton.addEventListener("click", createAction);
  };

  return { init, render };
};

const Presentational = createPresentational();

export default Presentational;
