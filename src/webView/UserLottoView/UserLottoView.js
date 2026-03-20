const html = String.raw;

export default class UserLottoView {
  constructor() {
    this.$userForm = document.querySelector("#user-form");
    this.$winningInputs = Array.from(
      this.$userForm.querySelectorAll(".winningNumber-line")
    );
    this.$bonusInput = document.querySelector(".bonusNumber-line");
    this.$error = document.querySelector("#user-lotto-error");
  }

  bindCheckResult(handler) {
    this.$userForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const winningNumbers = this.$winningInputs.map((input) =>
        Number(input.value)
      );
      const bonusNumber = Number(this.$bonusInput.value);

      handler({ winningNumbers, bonusNumber });
    });
  }

  showError(message) {
    this.$error.textContent = message;
    if (this.$winningInputs[0]) this.$winningInputs[0].focus();
  }

  clearError() {
    this.$error.textContent = "";
  }

  clearInputs() {
    this.$winningInputs.forEach((input) => {
      input.value = "";
    });
    this.$bonusInput.value = "";
  }

  show() {
    this.$lottoSection.hidden = false;
  }

  hide() {
    this.$lottoSection.hidden = true;
  }
}
