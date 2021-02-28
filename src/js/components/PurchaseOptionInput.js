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
    this.$purchaseQuantitySummary = $('.purchase-quantity-summary');
    this.$ticketIssueButton = $('.ticket-issue-button');
    this.$manualSelectAdd = $('.manual-select-add');
    this.$paperAddButton = $('.paper-add-button');
    this.$$paperRemoveButton = $$('.paper-remove-button');
    this.$$applyQuantitySelect = $$('.apply-quantity-select');
  }

  subscribeAppStages() {
    this.stageManager.subscribe(PURCHASE_AMOUNT_COMPLETED, this.renderSection.bind(this));
  }

  renderSection() {
    show(this.$purchaseOptionSection);
    show(this.$ticketIssueButton);
    show(this.$manualSelectAdd);
  }
}
