import createDomElement from '../../../../../utils/createDomElement';

const $bonusInput = () => {
  const bonusInput = createDomElement('input', {
    className: 'bonus_number',
    name: 'bonusNumber',
    type: 'number',
    min: 1,
    max: 45,
    required: true,
  });

  return bonusInput;
};

export default $bonusInput;
