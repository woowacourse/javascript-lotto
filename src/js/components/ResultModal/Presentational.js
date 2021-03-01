import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import { $, $$, toDataAttributeSelector as toDAS } from "../../utils/index.js";

const createPresentational = () => {
  const $container = $(toDAS(JS_SELECTOR.RESULT_MODAL.CONTAINER));
  const $close = $(toDAS(JS_SELECTOR.RESULT_MODAL.CLOSE));
  const $restartButton = $(toDAS(JS_SELECTOR.RESULT_MODAL.RESTART_BUTTON));
  const $profitRateParagraph = $(
    toDAS(JS_SELECTOR.RESULT_MODAL.PROFIT_RATE_PARAGRAPH)
  );
  const $$winningCounts = [
    ...$$(toDAS(JS_SELECTOR.RESULT_MODAL.WINNING_COUNT)),
  ];

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
