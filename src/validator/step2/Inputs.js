import checkUnit from './amount.js';
import { LOTTO } from '../../constants/values.js';
import { checkDrawingNumbersFormat, checkWinNumberRange, checkWinNumbersRange } from './lotto.js';

const Inputs = {
  amount(amount, { onError: errorCallback }) {
    try {
      this._checkAmount(amount);

      return { isValid: true };
    } catch (error) {
      errorCallback(error.message);

      return { isValid: false };
    }
  },

  _checkAmount(amount) {
    checkUnit(amount, LOTTO.UNIT);
  },

  drawingNumbers(drawingNumbers, { onError: errorCallback }) {
    try {
      this._checkDrawingNumbers(drawingNumbers);
      return { isValid: true };
    } catch (error) {
      errorCallback(error.message);

      return { isValid: false };
    }
  },

  _checkWinNumbers(winNumbers) {
    checkWinNumbersRange(winNumbers);
  },

  _checkBonusNumber(bonusNumber) {
    checkWinNumberRange(bonusNumber);
  },

  _checkDrawingNumbers({ winNumbers, bonusNumber }) {
    this._checkWinNumbers(winNumbers);
    this._checkBonusNumber(bonusNumber);
    checkDrawingNumbersFormat({ winNumbers, bonusNumber });
  },
};

export default Inputs;
