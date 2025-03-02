import SELECTORS from '../../constants/Selectors.js';

function clearLottoInputs() {
  const form = document.getElementById(SELECTORS.FORM.LOTTO);
  form.reset();
}

export default clearLottoInputs;
