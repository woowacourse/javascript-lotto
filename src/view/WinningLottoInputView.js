class WinningLottoInputView {
  constructor() {
    this.form = document.getElementById('winning-lotto-form');
  }

  addSubmitHandler(winningLottoInputHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const winningNumbersInput = [...document.querySelectorAll('.winning-numbers .number-input')];
      const bonusNumberInput = document.querySelector('.bonus-number .number-input');
      const winningNumbers = winningNumbersInput.map((input) => input.value).map(Number);
      const bonusNumber = Number(bonusNumberInput.value);

      winningLottoInputHandler(winningNumbers, bonusNumber);
    });
  }
}

export default WinningLottoInputView;
