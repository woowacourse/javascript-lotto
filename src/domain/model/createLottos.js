import CONFIG from '../../constants/config.js';
import Lotto from './Lotto.js';
import pickNumberInList from '../../utils/pickNumberInList.js';

function getLottoQuantity(money) {
  return money / CONFIG.LOTTO.PRICE.MIN;
}

function createLotto() {
  const randomNumbers = pickNumberInList({
    min: CONFIG.LOTTO.NUMBER.MIN,
    max: CONFIG.LOTTO.NUMBER.MAX,
    maxLength: CONFIG.LOTTO.LENGTH,
  });
  return new Lotto(randomNumbers);
}

export default function createLottos(money) {
  const quantity = getLottoQuantity(money);
  return Array.from({ length: quantity }).map(() => createLotto());
}
