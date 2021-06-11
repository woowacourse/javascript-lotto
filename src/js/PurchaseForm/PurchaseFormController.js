import { $ } from '../utils/utils.js';
import { SELECTORS } from '../constants.js';
import PurchaseFormModel from './PurchaseFormModel.js';
import PurchaseFormView from './PurchaseFormView.js';

export default class PurchaseFormController {
  constructor() {
    this.model = new PurchaseFormModel();
    this.view = new PurchaseFormView();
    this.bindEvents();
  }

  bindEvents() {
    $(SELECTORS.MONEY_INPUT.FORM).addEventListener('submit', this.handleSubmitMoney.bind(this));
  }

  handleSubmitMoney(event) {
    event.preventDefault();

    const money = Number(event.target.elements['money-input'].value);

    this.model.purchase(money);
    this.view.render(this.model.getData().lottoCount);

    const purchaseEvent = new CustomEvent('purchase', {
      detail: {
        lottoCount: this.model.getData().lottoCount,
      },
    });

    document.dispatchEvent(purchaseEvent);

    $('#lotto-numbers-input-first').focus();
  }

  handleAutoGenerateLottoNumbers() {
    [...Array(this.data.lottoCount)].map(() => this.generateLotto());

    $(SELECTORS.LOTTO_LIST.ELEMENT).remove();
    this.view.renderLottoList(this.data.lottos);

    $(SELECTORS.LOTTO_NUMBERS_INPUT.SECTION).classList.add('d-none');
    showElement($(SELECTORS.WINNING_NUMBER_INPUT.SECTION));
    $(`${SELECTORS.WINNING_NUMBER_INPUT.INPUT}:first-child`).focus();
  }
}
