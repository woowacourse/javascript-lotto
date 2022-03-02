import { $, $$ } from '../utils/dom';
import { ERROR_MESSAGE, LOTTO_PRICE } from './constants';
import { isValidMoneyInput, isDuplicatedLottos } from './validator';
import Lotto from '../model/Lotto';
import { showResult, toggleNumberDetail } from '../view/lottoView';
import { maxLengthHandler } from '../utils/maxLengthHandler';

export default class LottoController {
  constructor() {
    this.lottos = [];
    this.winningLottos = [];
    $('.purchase-form').addEventListener('submit', this.purchaseHandler);
    $('.cm-toggle').addEventListener('click', toggleNumberDetail);
    $('.winning-numbers-form').addEventListener('submit', this.winningLottoHandler);
    $$('.winning-numbers').forEach(input => input.addEventListener('input', maxLengthHandler));
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

  winningLottoHandler = e => {
    e.preventDefault();
    const winningNumbers = Array.prototype.slice.call($$('.winning-numbers')).map(input => input.value);

    if (isDuplicatedLottos(winningNumbers)) {
      alert(ERROR_MESSAGE.DUPLICATED_WINNING_INPUT);
      return;
    }
    this.winningLottos = [...winningNumbers];
  }
}
