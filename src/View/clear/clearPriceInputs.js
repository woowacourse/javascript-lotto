import SELECTORS from '../../constants/Selectors.js';

function clearPriceInputs() {
  const form = document.getElementById(SELECTORS.FORM.PURCHASE);
  form.reset();
}

export default clearPriceInputs;
