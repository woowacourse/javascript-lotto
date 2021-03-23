import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE } from "../Util/constants.js";
import { $, $$ } from "../Util/querySelector.js";

class Modal {
  constructor() {
    messenger.addMessageListener(
      MESSAGE.MONEY_TOTAL_PRIZE_MATCHING_COUNT_PREPARED,
      this.handleModal.bind(this)
    );

    $(ELEMENT.MODAL_CLOSE).addEventListener("click", this.closeModal);
    $(ELEMENT.RESTART_BUTTON).addEventListener(
      "click",
      this.handleRestartButton.bind(this)
    );
  }

  handleModal({ money, totalPrize, matchingCounts }) {
    this.render(money, totalPrize, matchingCounts);
    this.showModal();
  }

  handleRestartButton() {
    this.closeModal();
    this.clearWinningBonusNumber();

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

  clearWinningBonusNumber() {
    Array.from($$(ELEMENT.WINNING_NUMBER)).map((number) => (number.value = ""));
    $(ELEMENT.BONUS_NUMBER).value = "";
  }

  showModal() {
    $(ELEMENT.MODAL).classList.add(ELEMENT.OPEN);
  }

  closeModal() {
    $(ELEMENT.MODAL).classList.remove(ELEMENT.OPEN);
  }
}

export default Modal;
