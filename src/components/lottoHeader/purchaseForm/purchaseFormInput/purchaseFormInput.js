import createDomElement from '../../../../utils/createDomElement.js';
import { validateMoney } from '../../../../domain/validation.js';

const $purchaseFormInput = () => {
  const purchaseFormInput = createDomElement('input', {
    type: 'number',
    name: 'money',
    min: 1000,
    max: 100000,
    placeholder: '1,000원 ~ 100,000원 구매가 가능합니다.',
  });

  purchaseFormInput.addEventListener('input', () => {
    try {
      validateMoney(purchaseFormInput.value);
      document.getElementById('lottoBuyError').textContent = '';
      document.getElementById('lottoBuyError').classList.remove('show');
    } catch (error) {
      document.getElementById('lottoBuyError').textContent = error.message;
      document.getElementById('lottoBuyError').classList.add('show');
    }
  });
  return purchaseFormInput;
};

export default $purchaseFormInput;
