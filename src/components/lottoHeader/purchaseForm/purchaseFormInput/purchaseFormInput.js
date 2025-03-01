import createDomElement from '../../../../utils/createDomElement.js';
import { validateMoney } from '../../../../domain/validation.js';

const moneyInputOption = {
  type: 'number',
  name: 'money',
  min: 1000,
  max: 100000,
  placeholder: '1,000원 ~ 100,000원 구매가 가능합니다.',
};

const buyButtonState = (state, error) => {
  if (state) {
    document.getElementById('lottoBuyError').textContent = '';
    document.getElementById('lottoBuyError').classList.remove('show');
    document.getElementById('buyButton').classList.remove('disabled_button');
    document.getElementById('buyButton').disabled = false;

    return;
  }

  document.getElementById('lottoBuyError').textContent = error.message;
  document.getElementById('lottoBuyError').classList.add('show');
  document.getElementById('buyButton').classList.add('disabled_button');
  document.getElementById('buyButton').disabled = true;
};

const $purchaseFormInput = () => {
  const purchaseFormInput = createDomElement('input', moneyInputOption);

  purchaseFormInput.addEventListener('input', () => {
    try {
      validateMoney(purchaseFormInput.value);
      buyButtonState(true);
    } catch (error) {
      buyButtonState(false, error);
    }
  });
  return purchaseFormInput;
};

export default $purchaseFormInput;
