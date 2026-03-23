class WinningInput {
  constructor() {
    this.$winningNumbersForm = document.querySelector(".winning-section__form");
    this.$winningNumberInputs = document.querySelectorAll(
      ".winning-section__input",
    );
    this.$winningSection = document.querySelector(".winning-section");
    this.$bonusNumberInput = document.querySelector(
      ".winning-section__input--bonus",
    );
  }

  bindCalculate(handler) {
    this.$winningNumbersForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const winningNumbers = Array.from(this.$winningNumberInputs).map(
        (input) => Number(input.value),
      );
      const bonusNumber = Number(this.$bonusNumberInput.value);

      handler({ winningNumbers, bonusNumber });
    });
  }

  showWinningInput() {
    this.$winningSection.classList.remove("hidden");
  }

  reset() {
    this.$winningSection.classList.add("hidden");
    this.$winningNumbersForm.reset();
  }
}

export default WinningInput;
