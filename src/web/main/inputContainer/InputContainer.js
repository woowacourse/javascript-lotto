import './InputContainer.css';

export default function InputContainer() {
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  const priceInput = document.createElement('input');
  priceInput.type = 'text';
  priceInput.placeholder = '금액';

  const purchaseButton = document.createElement('button');
  purchaseButton.innerText = '구매';

  inputContainer.appendChild(priceInput);
  inputContainer.appendChild(purchaseButton);

  return inputContainer;
}
