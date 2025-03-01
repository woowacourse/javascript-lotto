function clearLottoInputs() {
  const numInputs = document.querySelectorAll('.num-input');
  numInputs.forEach((input) => {
    input.value = '';
  });

  const bonusInput = document.getElementById('bonusnum-input');
  if (bonusInput) {
    bonusInput.value = '';
  }
}

export default clearLottoInputs;
