import createDomElement from '../../../../utils/createDomElement.js';
import showSuccessState from '../../../../utils/showSuccessState.js';
import showErrorState from '../../../../utils/showErrorState.js';
import { validateMoney } from '../../../../domain/validation.js';

const moneyInputOption = {
  type: 'number',
  name: 'money',
  min: 1000,
  max: 100000,
  placeholder: '1,000원 ~ 100,000원 구매가 가능합니다.',
};

const $purchaseFormInput = () => {
  const purchaseFormInput = createDomElement('input', moneyInputOption);
  const purchaseFormInputChange = () => {
    try {
      validateMoney(purchaseFormInput.value);
      showSuccessState('lottoBuyError', 'buyButton');
    } catch (error) {
      showErrorState('lottoBuyError', 'buyButton', error);
    }
  };
  purchaseFormInput.addEventListener('input', purchaseFormInputChange);
  return purchaseFormInput;
};

export default $purchaseFormInput;
