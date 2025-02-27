import './PlayLotto.css';
import { LOTTO } from '../../domain/lottoConstants';
import { getRandomLottos } from '../../domain/getRandomLottos';
import randomLottos from '../randomLottos/RandomLottos';
import WinningNumbers from '../winningNumbers/winningNumbers';
import { createElement } from '../utils/dom';
import PurchaseForm from '../view/PurchaseForm';
import LottoResultModal from './LottoResultModal';
import { getArrayOfStringsFromArrayOfArrays } from '../utils/getArrayOfStringsFromArrayOfArrays';

export default function PlayLotto() {
  const playLotto = createElement('div', { class: 'play-lotto' });
  const { priceInput, purchaseButton } = PurchaseForm(playLotto);

  purchaseButton.addEventListener('click', () => {
    try {
      const lottoQuantity = priceInput.value / LOTTO.MIN_PURCHASE_PRICE;

      const randomlottos = getRandomLottos(lottoQuantity);
      randomLottos(playLotto, getArrayOfStringsFromArrayOfArrays(randomlottos));

      const winningNumberInputHeader = createElement('span', {
        class: 'header',
        textContent: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
      });
      playLotto.appendChild(winningNumberInputHeader);

      const { winningNumbersArray, bonusNumber } = WinningNumbers(playLotto);

      const resultButton = LottoResultModal(
        { priceInput, playLotto, randomlottos },
        {
          winningNumbers: winningNumbersArray,
          bonusNumber: bonusNumber,
        },
      );

      playLotto.appendChild(resultButton);
    } catch (error) {
      alert(error.message);
    }
  });

  return playLotto;
}
