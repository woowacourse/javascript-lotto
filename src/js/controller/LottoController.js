import { $ } from '../utils/dom';
import { ERROR_MESSAGE, LOTTO_PRICE } from './constants';
import { isValidMoneyInput } from './validator';
import Lotto from '../model/Lotto';
import { showResult, toggleNumberDetail } from '../view/lottoView';

export default class LottoController {
  constructor() {
    this.lottos = [];
    $('.purchase-form').addEventListener('submit', this.purchaseHandler);
    $('.cm-toggle').addEventListener('click', toggleNumberDetail);
  }

  getLottos = (moneyInput) => {
    const numberOfLottos = parseInt(moneyInput / LOTTO_PRICE);
    for (let i = 0; i < numberOfLottos; i += 1) {
      const lotto = new Lotto();
      this.lottos.push(lotto.lottoNumbers);
    }
  }

  purchaseHandler = e => {
    e.preventDefault();
    const moneyInput = Number($('.money-input').value);

    if (!isValidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }
    this.getLottos(moneyInput);
    showResult(this.lottos);
  }
}
