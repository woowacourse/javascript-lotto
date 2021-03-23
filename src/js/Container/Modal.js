import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE } from "../Util/constants.js";
import { clearInput, showModal, closeModal } from "../Util/DOM.js";
import { $, $$ } from "../Util/querySelector.js";

class Modal {
  constructor() {
    messenger.addMessageListener(
      MESSAGE.MONEY_TOTAL_PRIZE_MATCHING_COUNT_PREPARED,
      this.handleModal.bind(this)
    );

    $(ELEMENT.MODAL_CLOSE).addEventListener("click", () => {
      closeModal(ELEMENT.MODAL);
    });
    $(ELEMENT.RESTART_BUTTON).addEventListener(
      "click",
      this.handleRestartButton.bind(this)
    );
  }

  handleModal({ money, totalPrize, matchingCounts }) {
    this.render(money, totalPrize, matchingCounts);
    showModal(ELEMENT.MODAL);
  }

  handleRestartButton() {
    clearInput(ELEMENT.WINNING_NUMBER);
    clearInput(ELEMENT.BONUS_NUMBER);
    closeModal(ELEMENT.MODAL);

    messenger.dispatchMessage(MESSAGE.RESTART_BUTTON_CLICKED);
  }

  render(money, totalPrize, matchingCounts) {
    const winningCounts = $$(ELEMENT.WINNING_COUNT);
    const earningRate = ((totalPrize - money) / money) * 100;

    matchingCounts.reverse();
    matchingCounts = matchingCounts.slice(1);

    winningCounts.forEach((count, i) => {
      count.innerText = `${matchingCounts[i]}개`;
    });

    $(
      ELEMENT.TOTAL_EARNING_RATE
    ).innerText = `당신의 총 수익률은 ${earningRate.toLocaleString()}% 입니다.`;
  }
}

export default Modal;
