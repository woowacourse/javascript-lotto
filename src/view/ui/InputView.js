/* eslint-disable no-alert */

import { validateBonus, validateLottoNumber, validateMoney } from '../../domain/validation.js';
import normalizeErrorMessage from '../utils/normalizeErrorMessage.js';

function catchError(validate) {
  try {
    validate();
    return false;
  } catch (error) {
    alert(normalizeErrorMessage(error.message));
    return true;
  }
}

const InputView = {
  readMoney() {
    const userMoney = document.querySelector('#user-money').value;
    if (!catchError(() => validateMoney(userMoney))) {
      return userMoney;
    }
    return false;
  },
  readWinningNumbers() {
    const winningNumbers = [...document.querySelectorAll('.input-winning-number')].map((element) => Number(element.value));
    if (!catchError(() => validateLottoNumber(winningNumbers))) {
      return winningNumbers;
    }
    return false;
  },
  readBonusNumber(winningLotto) {
    const bonusNumber = Number(document.querySelector('#input-bonus-number').value);
    if (!catchError(() => validateBonus(bonusNumber, winningLotto))) {
      return bonusNumber;
    }
    return false;
  },
};

export default InputView;
