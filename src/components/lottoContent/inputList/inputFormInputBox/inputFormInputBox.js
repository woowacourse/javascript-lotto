import createDomElement from '../../../../utils/createDomElement.js';
import $bonusInput from './bonusInput/bonusInput.js';
import $inputFormButton from './inputFormButton/inputFormButton.js';
import $winningInputs from './winningInputs/winningInputs.js';

const $lottoFormInputBox = () => {
  const inputFormInputBox = createDomElement('form', {
    className: 'lotto_input_box',
    id: 'winningNumberInputForm',
  });

  inputFormInputBox.appendChild($winningInputs(6));
  inputFormInputBox.appendChild($bonusInput());
  inputFormInputBox.appendChild($inputFormButton());

  return inputFormInputBox;
};

export default $lottoFormInputBox;
