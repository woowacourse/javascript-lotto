import createDomElement from '../../../../utils/createDomElement.js';

const $purchaseFormInput = () => {
  const purchaseFormInput = createDomElement('input', {
    type: 'number',
    name: 'money',
    min: 1000,
    max: 100000,
    placeholder: '1,000원 ~ 100,000원 구매가 가능합니다.',
  });

  return purchaseFormInput;
};

export default $purchaseFormInput;
