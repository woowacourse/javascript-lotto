import {
  BonusNumberInput,
  WinningNumberInput,
} from "../../components/LottoWinningForm";

const WinningInputView = {
  winningSection: document.querySelector("#winning-section"),
  winningForm: document.querySelector("#winning-form"),
  winningNumbersContainer: document.querySelector("#winning-numbers-container"),
  bonusNumberContainer: document.querySelector("#bonus-number-container"),

  onSubmitNumbers(handler) {
    this.winningForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(this.winningForm);
      const winningNumbers = formData.getAll("winning-number").map(Number);
      const bonusNumber = Number(formData.get("bonus-number"));
      handler(winningNumbers, bonusNumber);
    });
  },

  renderInput() {
    this.winningNumbersContainer.innerHTML = WinningNumberInput();
    this.bonusNumberContainer.innerHTML = BonusNumberInput();

    this.winningSection.classList.remove("hidden");
  },

  hideInput() {
    this.winningSection.classList.add("hidden");
  },

  clearInput() {
    this.winningForm.reset();
  },
};

export default WinningInputView;
