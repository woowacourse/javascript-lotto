import { $ } from './util/web/dom';
import * as LottoGameValidator from './domain/validator';
import convertToNumeric from './util/convertToNumeric';
import LottoMachine from './domain/LottoMachine';
import LottoListView from './view/web/LottoListView';

class LottoWebGame {
  #lottos;

  constructor() {
    this.bindEventListeners();
  }

  bindEventListeners() {
    $('.purchase-amount-form').addEventListener('submit', this.onSubmitPurchaseButton.bind(this));
  }

  onSubmitPurchaseButton(e) {
    e.preventDefault();

    try {
      const purchaseAmount = convertToNumeric($('#purchase-amount-input').value);
      LottoGameValidator.validatePurchaseAmount(purchaseAmount);
      const lottoMachine = new LottoMachine(purchaseAmount);
      this.#lottos = lottoMachine.issueLottos();

      LottoListView.render($('#purchase-lotto-list-section'), this.#lottos);
    } catch (error) {
      alert(error.message);
      $('#purchase-amount-input').value = '';
    }
  }
}

export default LottoWebGame;
