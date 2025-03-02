import createDomElement from '../../../../utils/createDomElement.js';
import $bonusInput from './bonusInput/bonusInput.js';
import $inputFormButton from './inputFormButton/inputFormButton.js';
import $winningInputs from './winningInputs/winningInputs.js';
import { LOTTO_RULE } from '../../../../domain/constants.js';

const $lottoFormInputBox = () => {
  const inputFormInputBox = createDomElement('form', {
    className: 'lotto_input_box',
    id: 'winningNumberInputForm',
  });
  inputFormInputBox.appendChild($winningInputs(LOTTO_RULE.LENGTH));
  inputFormInputBox.appendChild($bonusInput());
  inputFormInputBox.appendChild($inputFormButton());

  return inputFormInputBox;
};

export default $lottoFormInputBox;
