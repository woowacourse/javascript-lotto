import createDomElement from '../../../../utils/createDomElement.js';

const $purchaseFormButton = () => {
  const purchaseFormButton = createDomElement('button', {
    type: 'submit',
    id: 'buyButton',
    textContent: '구입',
  });

  return purchaseFormButton;
};

export default $purchaseFormButton;
