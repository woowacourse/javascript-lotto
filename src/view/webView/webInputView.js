const webInputView = {
  readWinningLottoNumber: () => {
    const winningNumberInputs = document.querySelectorAll('#winning-lotto-fieldset input');
    return Array.from(winningNumberInputs).map((input) => input.value);
  },

  readBonusNumber: () => {
    const bonusNumberInput = document.querySelector('#bonus-number-fieldset input');
    return bonusNumberInput.value;
  },
};

export default webInputView;
