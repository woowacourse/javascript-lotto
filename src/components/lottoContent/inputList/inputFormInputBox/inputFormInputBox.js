import createDomElement from '../../../../utils/createDomElement.js';
import showSuccessState from '../../../../utils/showSuccessState.js';
import showErrorState from '../../../../utils/showErrorState.js';
import $bonusInput from './bonusInput/bonusInput.js';
import $inputFormButton from './inputFormButton/inputFormButton.js';
import $winningInputs from './winningInputs/winningInputs.js';
import $winningNumbersError from './errorText/errorText.js';
import { LOTTO_RULE } from '../../../../domain/constants.js';
import {
  validateBonus,
  validateLottoNumber,
} from '../../../../domain/validation.js';

const getWinningValues = () => {
  const winningNumberForm = document.getElementById('winningNumberInputForm');
  const allWinningValues = Array.from(winningNumberForm.winningNumber)
    .map((input) => input.valueAsNumber)
    .filter((value) => !isNaN(value));
  const bonusInputValue = winningNumberForm.bonusNumber.valueAsNumber;

  return [allWinningValues, bonusInputValue];
};

export const validateAllInputs = () => {
  try {
    const [allWinningValues, bonusInputValue] = getWinningValues();

    validateLottoNumber(allWinningValues);
    validateBonus(bonusInputValue, allWinningValues);
    showSuccessState('lottoWinningNumbersError', 'lottoResultButton');
  } catch (error) {
    showErrorState('lottoWinningNumbersError', 'lottoResultButton', error);
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
