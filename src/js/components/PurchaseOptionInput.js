import { PURCHASE_AMOUNT_COMPLETED } from '../constants/appStages.js';
import { $, $$, show } from '../utils/DOM.js';

export default class PurchaseOptionInput {
  constructor({ stageManager }) {
    this.stageManager = stageManager;

    this.selectDOMs();
    this.subscribeAppStages();
  }

  selectDOMs() {
    this.$purchaseOptionSection = $('.purchase-option-section');
    this.$autoQuantity = $('.auto-quantity');
    this.$manualQuantity = $('.manual-quantity');
    this.$ticketIssueButton = $('.ticket-issue-button');
    this.$manualSelectAdd = $('.manual-select-add');
    this.$paperAddButton = $('.paper-add-button');
    this.$$paperRemoveButton = $$('.paper-remove-button');
    this.$$applyQuantitySelect = $$('.apply-quantity-select');
  }

  subscribeAppStages() {
    this.stageManager.subscribe(PURCHASE_AMOUNT_COMPLETED, this.renderSection.bind(this));
  }

  updateQuantitySummary({ auto, manual }) {
    this.$autoQuantity.innerText = auto;
    this.$manualQuantity.innerText = manual;
  }

  renderSection() {
    show(this.$purchaseOptionSection);
    show(this.$ticketIssueButton);
    show(this.$manualSelectAdd);
    this.updateQuantitySummary({ auto: this.stageManager.numOfLotto, manual: 0 });
  }
}
