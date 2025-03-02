import { printError } from '../View/OutputView.js';
import clearLottoInputs from '../View/clear/clearLottoInputs.js';
import clearUIElements from '../View/clear/clearUIElements.js';

export const priceErrorHandler = (error) => {
  clearUIElements();
  printError(error.message);
  alert(error.message);
  throw error;
};

export const lottoInputErrorHandler = (error) => {
  clearLottoInputs();
  printError(error.message);
  alert(error.message);
  throw error;
};

export const defaultErrorHandler = (error) => {
  printError(error.message);
};
