import {
  BonusNumberInput,
  WinningNumberInput,
} from "../../components/LottoWinningForm";

const WinningInputView = {
  winningSection: document.querySelector("#winning-section"),
  winningNumbersContainer: document.querySelector("#winning-numbers-container"),
  bonusNumberContainer: document.querySelector("#bonus-number-container"),

  onSubmitNumbers(handler) {
    this.winningSection.addEventListener("submit", (e) => {
      e.preventDefault();

      const winningForm = e.target;
      const formData = new FormData(winningForm);
      const winningNumbers = formData.getAll("winning-number").map(Number);
      const bonusNumber = Number(formData.get("bonus-number"));
      handler(winningNumbers, bonusNumber);

      winningForm.reset();
    });
  },

  renderInput() {
    this.winningNumbersContainer.innerHTML = WinningNumberInput();
    this.bonusNumberContainer.innerHTML = BonusNumberInput();

    this.winningSection.classList.remove("hidden");
  },

  reset() {
    this.winningSection.classList.add("hidden");
  },
};

export default WinningInputView;
