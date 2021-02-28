import { PURCHASE_AMOUNT_COMPLETED } from '../constants/appStages.js';
import { getSelectPaperHTML } from '../layouts/selectPaper.js';
import { $, $$, show } from '../utils/DOM.js';

export default class PurchaseOptionInput {
  constructor({ stageManager }) {
    this.stageManager = stageManager;
    this.autoQuantity = 0;
    this.manualQuantity = 0;

    this.selectDOMs();
    this.subscribeAppStages();
    this.attachEvents();
  }

  selectDOMs() {
    this.$purchaseOptionSection = $('.purchase-option-section');
    this.$autoQuantity = $('.auto-quantity');
    this.$manualQuantity = $('.manual-quantity');
    this.$ticketIssueButton = $('.ticket-issue-button');
    this.$manualSelectForm = $('.manual-select-form');
    this.$manualSelectAdd = $('.manual-select-add');
    this.$paperAddButton = $('.paper-add-button');
  }

  subscribeAppStages() {
    this.stageManager.subscribe(PURCHASE_AMOUNT_COMPLETED, this.renderSection.bind(this));
  }

  attachEvents() {
    this.$paperAddButton.addEventListener('click', this.onAddPaper.bind(this));
  }

  onAddPaper() {
    this.$manualSelectForm.insertAdjacentHTML('beforeEnd', getSelectPaperHTML(this.autoQuantity - 1));
    this.setState({ autoQuantity: this.autoQuantity - 1, manualQuantity: this.manualQuantity + 1 });
  }

  renderQuantitySummary() {
    this.$autoQuantity.innerText = this.autoQuantity;
    this.$manualQuantity.innerText = this.manualQuantity;
  }

  renderSection() {
    show(this.$purchaseOptionSection);
    show(this.$ticketIssueButton);
    show(this.$manualSelectAdd);
    this.setState({ autoQuantity: this.stageManager.numOfLotto, manualQuantity: 0 });
  }

  setState({ autoQuantity, manualQuantity }) {
    this.autoQuantity = Number(autoQuantity);
    this.manualQuantity = Number(manualQuantity);
    this.renderQuantitySummary();
  }
}
