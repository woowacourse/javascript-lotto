import { printError } from '../View/OutputView.js';
import clearUIElements from '../View/clear/clearUIElements.js';

export const uiErrorHandler = (error) => {
  printError(error.message);
  clearUIElements();
  alert(error.message);
};

export const defaultErrorHandler = (error) => {
  printError(error.message);
};
