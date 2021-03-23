import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE } from "../Util/constants.js";
import { clearInput, hideContainer, showContainer } from "../Util/DOM.js";
import { $, $$ } from "../Util/querySelector.js";
import { isValidNumbers } from "../Util/validator.js";

class WinningNumber {
  constructor() {
    messenger.addMessageListener(MESSAGE.TICKET_ADDED_AS_BALANCE, () => {
      showContainer(ELEMENT.WINNING_NUMBER_CONTAINER);
    });

    $(ELEMENT.WINNING_NUMBER_CONTAINER).addEventListener(
      "submit",
      this.handleWinningNumber.bind(this)
    );

    messenger.addMessageListener(MESSAGE.RESTART_BUTTON_CLICKED, () => {
      hideContainer(ELEMENT.WINNING_NUMBER_CONTAINER);
    });
  }

  handleWinningNumber(event) {
    event.preventDefault();
    const inputWinningNumbers = Array.from($$(ELEMENT.WINNING_NUMBER)).map(
      (number) => number.value
    );
    const inputBonusNumber = $(ELEMENT.BONUS_NUMBER).value;

    if (!isValidNumbers(inputWinningNumbers.concat(inputBonusNumber))) {
      this.clearWinningBonusNumber();
      return;
    }

    messenger.dispatchMessage(MESSAGE.WINNING_NUMBER_SUBMITTED, {
      winningNumbers: inputWinningNumbers,
      bonusNumber: inputBonusNumber,
    });
  }

  clearWinningBonusNumber() {
    clearInput(ELEMENT.WINNING_NUMBER);
    clearInput(ELEMENT.BONUS_NUMBER);
    $$(ELEMENT.WINNING_NUMBER)[0].focus();
  }
}

export default WinningNumber;
