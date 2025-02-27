import createDomElement from '../../../utils/createDomElement.js';
import $purchaseFormButton from './purchaseFormButton/purchaseFormButton.js';
import $purchaseFormInput from './purchaseFormInput/purchaseFormInput.js';

const $headerPurchaseForm = () => {
  const headerPurchaseForm = createDomElement('form', {
    className: 'lotto_form',
    id: 'lottoBuyForm',
  });

  headerPurchaseForm.appendChild($purchaseFormInput());
  headerPurchaseForm.appendChild($purchaseFormButton());

  return headerPurchaseForm;
};

export default $headerPurchaseForm;
