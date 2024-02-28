import { OPTION } from "../constants/option.js";
import LottoMachine from "../domain/LottoMachine.js";
import WinningLotto from "../domain/WinningLotto.js";
import bonusNumberValidator from "../validator/BonusNumberValidator.js";

const winningNumbers = document.querySelectorAll(".input_winningNumber");
const bonusNumber = document.getElementById("input_bonusNumber");

const invalidWinningLotto = document.getElementById("invalid_winningLotto");

const dialog = document.getElementById("result_dialog");

const winningLottoHandler = {
  convertInputToNumber() {
    return Array.from(winningNumbers)
      .map((input) => input.value.trim())
      .join(OPTION.DELIMITER);
  },

  onInputKeyDown(event) {
    if (event.key !== "Enter") return;

    const nextInput = event.target.nextElementSibling;
    if (nextInput) {
      nextInput.focus();
    } else {
      bonusNumber.focus();
    }
  },

  makeWinningLotto() {
    const numbersString = this.convertInputToNumber();
    return new LottoMachine().makeWinningLotto(numbersString);
  },

  validateWinningLotto() {
    const winningLotto = this.makeWinningLotto();
    bonusNumberValidator(winningLotto.getNumbers(), Number(bonusNumber.value));
    invalidWinningLotto.innerText = "";

    return winningLotto;
  },

  onClickHandler(event, resolve) {
    event.preventDefault();
    try {
      const winningLotto = this.validateWinningLotto();
      resolve(WinningLotto(winningLotto, Number(bonusNumber.value)));
      dialog.showModal();
    } catch (error) {
      invalidWinningLotto.innerText = error.message;
    }
  },
};

export default winningLottoHandler;
