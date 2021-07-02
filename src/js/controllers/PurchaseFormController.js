import { $, disableElement } from '../utils/utils.js';
import { SELECTORS } from '../constants.js';
import PurchaseFormModel from '../models/PurchaseFormModel.js';

export default class PurchaseFormController {
  constructor() {
    this.model = new PurchaseFormModel();
    this.bindEvents();
  }

  bindEvents() {
    $(SELECTORS.MONEY_INPUT.FORM).addEventListener('submit', this.handleSubmitMoney.bind(this));
  }

  handleSubmitMoney(event) {
    event.preventDefault();

    const money = Number(event.target.elements['money-input'].value);

    this.model.purchase(money);

    const purchaseEvent = new CustomEvent('purchase', {
      detail: {
        lottoCount: this.model.getData().lottoCount,
      },
    });

    document.dispatchEvent(purchaseEvent);

    disableElement($(SELECTORS.MONEY_INPUT.INPUT));
    disableElement($(SELECTORS.MONEY_INPUT.SUBMIT_BUTTON));
    $('#lotto-numbers-input-first').focus();
  }
}
