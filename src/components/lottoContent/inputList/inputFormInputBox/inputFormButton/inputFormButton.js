import createDomElement from '../../../../../utils/createDomElement';

const $inputFormButton = () => {
  const inputFormButton = createDomElement('button', {
    type: 'submit',
    className: 'lotto_form_button disabled_button',
    id: 'lottoResultButton',
    textContent: '결과 확인하기',
  });

  return inputFormButton;
};

export default $inputFormButton;
