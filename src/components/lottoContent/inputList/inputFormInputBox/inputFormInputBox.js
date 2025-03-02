import createDomElement from '../../../../utils/createDomElement.js';
import $bonusInput from './bonusInput/bonusInput.js';
import $inputFormButton from './inputFormButton/inputFormButton.js';
import $winningInputs from './winningInputs/winningInputs.js';
import { LOTTO_RULE } from '../../../../domain/constants.js';
import {
  validateBonus,
  validateLottoNumber,
} from '../../../../domain/validation.js';
import $winningNumbersError from './errorText/errorText.js';

const resultButtonState = (state, error) => {
  if (state) {
    document.getElementById('lottoWinningNumbersError').textContent = '';
    document
      .getElementById('lottoWinningNumbersError')
      .classList.remove('show');
    document
      .getElementById('lottoResultButton')
      .classList.remove('disabled_button');
    document.getElementById('lottoResultButton').disabled = false;

    return;
  }

  document.getElementById('lottoWinningNumbersError').textContent =
    error.message;
  document.getElementById('lottoWinningNumbersError').classList.add('show');
  document.getElementById('lottoResultButton').classList.add('disabled_button');
  document.getElementById('lottoResultButton').disabled = true;
};

export const validateAllInputs = () => {
  try {
    const winningNumberForm = document.getElementById('winningNumberInputForm');
    const allWinningValues = Array.from(winningNumberForm.winningNumber)
      .map((input) => parseInt(input.value, 10))
      .filter((value) => !isNaN(value));
    const bonusInputValue = parseInt(winningNumberForm.bonusNumber.value, 10);

    validateLottoNumber(allWinningValues);
    validateBonus(bonusInputValue, allWinningValues);

    resultButtonState(true);
  } catch (error) {
    resultButtonState(false, error);
  }
};

const $lottoFormInputBox = () => {
  const inputFormInputBox = createDomElement('form', {
    className: 'lotto_input_box',
    id: 'winningNumberInputForm',
  });

  inputFormInputBox.appendChild($winningInputs(LOTTO_RULE.LENGTH));
  inputFormInputBox.appendChild($bonusInput());
  inputFormInputBox.appendChild($winningNumbersError());
  inputFormInputBox.appendChild($inputFormButton());

  return inputFormInputBox;
};

export default $lottoFormInputBox;
