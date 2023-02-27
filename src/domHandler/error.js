import { convertVisibilityToHidden, convertVisibilityToVisible, overwriteInnerText } from './utils';

const $budgetError = document.querySelector('.budget_error');
const $numberError = document.querySelector('.number_error');

const DOM_TYPE = {
  budget: $budgetError,
  number: $numberError,
};

const error = {
  clearError(type) {
    overwriteInnerText(DOM_TYPE[type], '');
  },

  overwriteError(type, message) {
    overwriteInnerText(DOM_TYPE[type], message);
  },
};

export default error;
