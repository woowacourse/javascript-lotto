import { printError } from '../View/OutputView.js';
import clearLottoInputs from '../View/clear/clearLottoInputs.js';
import clearUIElements from '../View/clear/clearUIElements.js';

export const handlePriceError = (error) => {
  clearUIElements();
  printError(error.message);
  alert(error.message);
  throw error;
};

export const handleLottoInputError = (error) => {
  clearLottoInputs();
  printError(error.message);
  alert(error.message);
  throw error;
};

export const displayError = (error) => {
  printError(error.message);
};
