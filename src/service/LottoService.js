import Lotto from '../model/Lotto.js';
import systemSettings from '../settings/systemSettings.js';
import { getUniqueRandomNumbers } from '../util/getUniqueRandomNumbers.js';
import { printLotto } from '../View/OutputView.js';

export default function makeLotto(purchaseAmount) {
  const lottos = [];

  for (let i = 0; i < purchaseAmount; i++) {
    const numberRange = {
      min: systemSettings.minLottoNumber,
      max: systemSettings.maxLottoNumber,
    };
    const numbers = getUniqueRandomNumbers(
      numberRange,
      systemSettings.lottoSize,
    );
    const lotto = new Lotto(numbers);
    printLotto(lotto);
    lottos.push(lotto);
  }
  return lottos;
}
