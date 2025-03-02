import { printError } from '../View/OutputView.js';
import clearLottoInputs from '../View/clear/clearLottoInputs.js';
import clearPriceInputs from '../View/clear/clearPriceInputs.js';

export const handlePriceError = (error) => {
  clearPriceInputs();
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
