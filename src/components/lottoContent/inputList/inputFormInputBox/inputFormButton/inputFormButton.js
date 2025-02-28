import createDomElement from '../../../../../utils/createDomElement';

const $inputFormButton = () => {
  const inputFormButton = createDomElement('button', {
    type: 'submit',
    className: 'lotto_form_button',
    textContent: '결과 확인하기',
  });

  return inputFormButton;
};

export default $inputFormButton;
