import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import {
  $,
  $$,
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../utils/index.js";

const createPresentational = () => {
  const $container = $(toCS(CLASSNAME.MODAL));
  const $close = $(toCS(CLASSNAME.MODAL.CLOSE));
  const $restartButton = $(toDAS(JS_SELECTOR.MODAL.RESTART_BUTTON));
  const $profitRateParagraph = $(
    toDAS(JS_SELECTOR.MODAL.PROFIT_RATE_PARAGRAPH)
  );
  const $$winningCounts = [...$$(toDAS(JS_SELECTOR.MODAL.WINNING_COUNT))];

  const TEMPLATE = (profitRate) =>
    `당신의 총 수익률은 ${profitRate.toLocaleString("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}입니다.`;

  const render = ({ isCleared, winningCounts, profitRate }) => {
    if (isCleared) {
      $container.classList.remove(CLASSNAME.MODAL.OPEN);
      return;
    }

    [...$$winningCounts].reverse().forEach(($td, index) => {
      $td.innerText = `${winningCounts[index]}개`;
    });
    $profitRateParagraph.innerText = TEMPLATE(profitRate);
    $container.classList.add(CLASSNAME.MODAL.OPEN);
  };

  const init = ({ closeModal, restart }) => {
    $close.addEventListener("click", closeModal);
    $restartButton.addEventListener("click", restart);
  };

  return { init, render };
};

const Presentational = createPresentational();

export default Presentational;
