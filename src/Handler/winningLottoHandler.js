import LottoMachine from "../domain/LottoMachine.js";
import WinningLotto from "../domain/WinningLotto.js";
import bonusNumberValidator from "../validator/BonusNumberValidator.js";

const winningNumbers = document.querySelectorAll(".input_winningNumber");
const bonusNumber = document.getElementById("input_bonusNumber");

const invalidWinningLotto = document.getElementById("invalid_winningLotto");

const winningLottoHandler = {
  onInputKeyDown(event) {
    if (event.key !== "Enter") {
      return;
    }

    const nextInput = event.target.nextElementSibling;

    if (nextInput) {
      nextInput.focus();
    } else {
      bonusNumber.focus();
    }
  },

  onClickHandler(event, resolve) {
    event.preventDefault();
    const numbersString = Array.from(winningNumbers)
      .map((input) => input.value.trim())
      .join(",");

    try {
      const winningLotto = new LottoMachine().makeWinningLotto(numbersString);
      bonusNumberValidator(
        winningLotto.getNumbers(),
        Number(bonusNumber.value),
      );

      resolve(WinningLotto(winningLotto, bonusNumber.value));

      invalidWinningLotto.innerText = "";
    } catch (error) {
      invalidWinningLotto.innerText = error.message;
    }
  },
};

export default winningLottoHandler;
