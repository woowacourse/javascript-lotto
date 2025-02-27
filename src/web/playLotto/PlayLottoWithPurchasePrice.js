import { createElement } from '../utils/dom';
import { LOTTO } from '../../domain/lottoConstants';
import { getArrayOfStringsFromArrayOfArrays } from '../utils/getArrayOfStringsFromArrayOfArrays';
import { getRandomLottos } from '../../domain/getRandomLottos';
import randomLottos from '../randomLottos/RandomLottos';
import WinningNumbers from '../winningNumbers/winningNumbers';
import LottoResultModal from './LottoResultModal';

export default function PlayLottoWithPurchasePrice(playLotto, priceInput) {
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
}
