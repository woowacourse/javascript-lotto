import createDomElement from '../../../../utils/createDomElement.js';

const $purchaseFormButton = () => {
  const purchaseFormButton = createDomElement('button', {
    type: 'submit',
    className: 'disabled_button',
    id: 'buyButton',
    textContent: '구입',
    disabled: true,
  });

  return purchaseFormButton;
};

export default $purchaseFormButton;
