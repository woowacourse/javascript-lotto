import { getRandomLottos } from '../../../domain/getRandomLottos';
import { LOTTO } from '../../../domain/lottoConstants';
import randomLottos from '../randomLottos/randomLottos';
import { getArrayOfStrings } from '../utils/getArrayOfStrings';
import './PlayLotto.css';

export default function PlayLotto() {
  const playLotto = document.createElement('div');
  playLotto.className = 'play-lotto';
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  const purchasePriceHeader = document.createElement('p');
  purchasePriceHeader.innerText = '구매 금액을 입력해주세요.';
  purchasePriceHeader.className = 'header';
  playLotto.appendChild(purchasePriceHeader);

  const priceInput = document.createElement('input');
  priceInput.type = 'text';
  priceInput.placeholder = '금액';

  const purchaseButton = document.createElement('button');
  purchaseButton.innerText = '구매';

  inputContainer.appendChild(priceInput);
  inputContainer.appendChild(purchaseButton);

  playLotto.appendChild(inputContainer);

  purchaseButton.addEventListener('click', () => {
    try {
      const lottoQuantity = priceInput.value / LOTTO.MIN_PURCHASE_PRICE;
      const randomlottos = getRandomLottos(lottoQuantity);
      randomLottos(playLotto, getArrayOfStrings(randomlottos));

      const winningNumberInputHeader = document.createElement('p');
      winningNumberInputHeader.innerText = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';
      playLotto.appendChild(winningNumberInputHeader);

      playLotto.appendChild;
    } catch (error) {
      alert(error.message);
    }
  });

  return playLotto;
}
