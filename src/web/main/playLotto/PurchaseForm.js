import { createElement } from '../../utils/dom';

export default function PurchaseForm(playLotto) {
  const purchasePriceHeader = createElement('span', {
    class: 'header',
    textContent: '구매 금액을 입력해주세요.',
  });
  playLotto.appendChild(purchasePriceHeader);

  const inputContainer = createElement('div', { class: 'input-container' });
  const priceInput = createElement('input', { type: 'text', placeholder: '금액' });
  const purchaseButton = createElement('button', { textContent: '구매' });

  inputContainer.appendChild(priceInput);
  inputContainer.appendChild(purchaseButton);

  playLotto.appendChild(inputContainer);
  return { priceInput, purchaseButton };
}
