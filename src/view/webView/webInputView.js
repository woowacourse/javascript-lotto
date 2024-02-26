const webInputView = {
  readWinningLottoNumber: () => {
    const winningNumberInputs = document.querySelectorAll('#winning-lotto-inputs input');
    return Array.from(winningNumberInputs).map((input) => input.value);
  },

  readBonusNumber: () => {
    const bonusNumberInput = document.querySelector('#bonus-number input');
    console.log('bonusNumberInput', bonusNumberInput.value);
    return bonusNumberInput.value;
  },
};

export default webInputView;
