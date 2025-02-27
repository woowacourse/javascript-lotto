import './PlayLotto.css';

import { createElement } from '../utils/dom';
import PurchaseForm from '../view/PurchaseForm';
import PlayLottoWithPurchasePrice from './PlayLottoWithPurchasePrice';

export default function PlayLotto() {
  const playLotto = createElement('div', { class: 'play-lotto' });
  const { priceInput, purchaseButton } = PurchaseForm(playLotto);

  purchaseButton.addEventListener('click', () => PlayLottoWithPurchasePrice(playLotto, priceInput));

  return playLotto;
}
