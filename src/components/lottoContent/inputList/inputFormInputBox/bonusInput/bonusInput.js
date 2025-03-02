import createDomElement from '../../../../../utils/createDomElement';
import { validateAllInputs } from '../inputFormInputBox';

const bonusNumberOption = {
  className: 'bonus_number',
  name: 'bonusNumber',
  type: 'number',
  min: 1,
  max: 45,
  required: true,
};

const $bonusInput = () => {
  const bonusInput = createDomElement('input', bonusNumberOption);
  bonusInput.addEventListener('input', validateAllInputs);
  return bonusInput;
};

export default $bonusInput;
