import SELECTORS from '../../constants/Selectors.js';

function clearUIElements() {
  const form = document.getElementById(SELECTORS.FORM.PURCHASE);
  form.reset();

  const resultMessage = document.getElementById(SELECTORS.CONTAINER.MESSAGE);
  resultMessage.innerHTML = '';

  document.querySelector(`.${SELECTORS.BUTTON.PURCHASE}`).disabled = false;

  document.querySelector('.lotto-content').innerHTML = '';

  document.querySelector(`.${SELECTORS.CONTAINER.LOTTO_INPUT}`).remove();

  document.querySelector('.prize-result').remove();

  document.querySelector('.modal-overlay').remove();
}

export default clearUIElements;
