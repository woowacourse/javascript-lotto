import { $ } from '../utils/dom';
import { ERROR_MESSAGE } from './constants';
import { isValidMoneyInput } from './validator';
import Lotto from '../model/Lotto';
import { showResult } from '../view/lottoView';

export default class LottoController {
  constructor() {
    this.lottos = [];
    const purchaseForm = $('.purchase-form');
    purchaseForm.addEventListener('submit', this.purchaseHandler);
  }

  purchaseHandler = e => {
    e.preventDefault();
    const moneyInput = Number($('.money-input').value);

    if (!isValidMoneyInput(moneyInput)) {
      alert(ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }

    const numberOfLottos = parseInt(moneyInput / 1000);
    for (let i = 0; i < numberOfLottos; i += 1) {
      const lotto = new Lotto();
      this.lottos.push(lotto.lottoNumbers);
    }
    showResult(this.lottos.length);
  }
  