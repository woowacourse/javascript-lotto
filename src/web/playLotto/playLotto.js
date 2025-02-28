import './PlayLotto.css';

import { createElement } from '../utils/dom';
import PurchaseForm from '../view/PurchaseForm';
import PlayLottoWithPurchasePrice from './PlayLottoWithPurchasePrice';

export default function PlayLotto() {
  const playLotto = createElement('div', { class: 'play-lotto' });
  const { priceInput, purchaseForm } = PurchaseForm(playLotto);

  purchaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    PlayLottoWithPurchasePrice(playLotto, priceInput);
    priceInput.disabled = true;
  });
  priceInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      PlayLottoWithPurchasePrice(playLotto, priceInput);
      priceInput.disabled = true;
    }
  });

  return playLotto;
}
