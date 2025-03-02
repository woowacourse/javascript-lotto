import SELECTORS from '../../constants/Selectors.js';

function clearLottoInputs() {
  const numInputs = document.querySelectorAll(
    `.${SELECTORS.INPUT.WINNING_NUMBER}`,
  );
  numInputs.forEach((input) => {
    input.value = '';
  });

  const bonusInput = document.getElementById(SELECTORS.INPUT.BONUS_NUMBER);
  if (bonusInput) {
    bonusInput.value = '';
  }
}

export default clearLottoInputs;
