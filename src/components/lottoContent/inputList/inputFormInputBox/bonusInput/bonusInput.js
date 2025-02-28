import createDomElement from '../../../../../utils/createDomElement';

const $bonusInput = () => {
  const bonusInput = createDomElement('input', {
    className: 'bonus_number',
    name: 'bonusNumber',
    type: 'number',
    max_length: 2,
    required: true,
  });

  return bonusInput;
};

export default $bonusInput;
