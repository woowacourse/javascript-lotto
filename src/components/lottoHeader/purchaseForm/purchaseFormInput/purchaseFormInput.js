import createDomElement from '../../../../utils/createDomElement.js';

const $purchaseFormInput = () => {
  const purchaseFormInput = createDomElement('input', {
    type: 'number',
    name: 'money',
    placeholder: '금액',
  });

  return purchaseFormInput;
};

export default $purchaseFormInput;
