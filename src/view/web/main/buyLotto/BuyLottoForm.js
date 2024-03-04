import BuyLottoInput from './BuyLottoInput';

export default function BuyLottoForm() {
  const form = document.createElement('form');
  const buyButton = document.createElement('button');

  form.setAttribute('id', 'buy-lotto-form');
  form.classList.add('buy-lotto-form');

  buyButton.innerText = '구입';
  buyButton.classList.add('buy-button');

  form.appendChild(BuyLottoInput());
  form.appendChild(buyButton);

  return form;
}
