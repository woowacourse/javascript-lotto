import { OPTION } from "../constants/option.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import bonusNumberValidator from "../validator/BonusNumberValidator.js";
import WebView from "../view/webView.js";

const winningNumbers = document.querySelectorAll(
  ".winning-lotto__input-number",
);
const bonusNumber = document.getElementsByClassName(
  "winning-lotto__input-bonus-number",
)[0];

const invalidWinningLotto = document.getElementsByClassName(
  "winning-lotto__invalid",
)[0];

// const dialog = document.getElementsByClassName("result_dialog")[0];
const dialog = document.querySelector(".result-dialog");

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
    const makedLotto = this.makeWinningLotto();
    bonusNumberValidator(makedLotto.getNumbers(), Number(bonusNumber.value));
    invalidWinningLotto.textContent = "";

    const winningLotto = WinningLotto(makedLotto, Number(bonusNumber.value));
    return winningLotto;
  },

  showModal(lottoList, winningLotto) {
    const result = new LottoResult(lottoList, winningLotto);
    const { rank, profit } = result.getResult();

    // dialog.showModal();
    dialog.showModal();
    WebView.showGameResult(rank);
    WebView.showProfit(profit);
  },

  onClickGameResult(event, lottoList) {
    event.preventDefault();
    try {
      const winningLotto = this.validateWinningLotto();
      this.showModal(lottoList, winningLotto);
    } catch (error) {
      invalidWinningLotto.textContent = error.message;
    }
  },
};

export default winningLottoHandler;
