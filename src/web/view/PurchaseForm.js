import { createElement } from '../utils/dom';
export default function PurchaseForm(playLotto) {
  const purchasePriceHeader = createElement('span', {
    class: 'header',
    textContent: '구매 금액을 입력해주세요.',
  });
  playLotto.appendChild(purchasePriceHeader);

  const purchaseForm = createElement('form', { class: 'purchase-form' });
  const priceInput = createElement('input', {
    type: 'number',
    placeholder: ' 금액',
    required: true,
    min: '1000',
    step: '1000',
  });
  const purchaseButton = createElement('button', { type: 'submit', textContent: '구매' });

  purchaseForm.appendChild(priceInput);
  purchaseForm.appendChild(purchaseButton);

  playLotto.appendChild(purchaseForm);
  return { priceInput, purchaseForm };
}
