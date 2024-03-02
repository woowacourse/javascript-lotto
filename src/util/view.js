import { ERROR_MESSAGE } from '../constants/message';

export const renderError = (el, errorMessage) => {
  el.innerHTML = errorMessage.slice(ERROR_MESSAGE.PREFIX.length + 1);
  renderElement(el);
};

export const hideElement = (el) => {
  el.classList.add('hidden');
};

export const renderElement = (el) => {
  el.classList.remove('hidden');
};

export const resetElementValue = (el) => {
  el.value = '';
};

export const focusElement = (el) => {
  el.focus();
};

// resetMoneyInput() {
//   $('#money-input').value = '';
// },
// focusMoneyInput() {
//   $('#money-input').focus();
// },
// resetWinningLottoNumbers() {
//   $$('.number-input').forEach((input) => (input.value = ''));
//   $('.number-input').focus();
// },
