import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import { $, $$, toDataAttributeSelector as toDAS } from "../../utils/index.js";
import { Presentational } from "../core/index.js";

class ResultModalPresentational extends Presentational {
  constructor(eventListeners) {
    super(eventListeners);
  }

  initalize() {
    this.$container = $(toDAS(JS_SELECTOR.RESULT_MODAL.CONTAINER));
    this.$close = $(toDAS(JS_SELECTOR.RESULT_MODAL.CLOSE));
    this.$restartButton = $(toDAS(JS_SELECTOR.RESULT_MODAL.RESTART_BUTTON));
    this.$profitRateParagraph = $(
      toDAS(JS_SELECTOR.RESULT_MODAL.PROFIT_RATE_PARAGRAPH)
    );
    this.$$winningCounts = [
      ...$$(toDAS(JS_SELECTOR.RESULT_MODAL.WINNING_COUNT)),
    ];
  }

  setEventListeners() {
    const { closeModal, restart } = this.eventListeners;

    this.$close.addEventListener("click", closeModal);
    this.$restartButton.addEventListener("click", restart);
  }

  render({ isCleared, winningCounts, profitRate }) {
    if (isCleared) {
      this.$container.classList.remove(CLASSNAME.MODAL.OPEN);
      return;
    }

    [...this.$$winningCounts].reverse().forEach(($td, index) => {
      $td.innerText = `${winningCounts[index]}개`;
    });

    this.$profitRateParagraph.innerText = this.TEMPLATE(profitRate);
    this.$container.classList.add(CLASSNAME.MODAL.OPEN);
  }

  TEMPLATE(profitRate) {
    return `당신의 총 수익률은 ${profitRate.toLocaleString("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}입니다.`;
  }
}

export default ResultModalPresentational;
