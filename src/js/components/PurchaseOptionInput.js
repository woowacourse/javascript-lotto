import { PURCHASE_AMOUNT_COMPLETED } from '../constants/appStages.js';
import { getSelectPaperHTML } from '../layouts/selectPaper.js';
import { $, select, unselect, show, enable, disable } from '../utils/DOM.js';

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
    this.$paperAdder = $('.paper-adder');
    this.$paperAddButton = $('.paper-add-button');
  }

  subscribeAppStages() {
    this.stageManager.subscribe(PURCHASE_AMOUNT_COMPLETED, this.renderSection.bind(this));
  }

  attachEvents() {
    this.$paperAddButton.addEventListener('click', this.onAddPaper.bind(this));
  }

  onAddPaper() {
    const defaultManualQuantity = 1;

    this.setState({
      autoQuantity: this.autoQuantity - defaultManualQuantity,
      manualQuantity: this.manualQuantity + defaultManualQuantity,
    });
    this.$manualSelectForm.insertAdjacentHTML(
      'beforeEnd',
      getSelectPaperHTML({ maxQuantity: defaultManualQuantity + this.autoQuantity })
    );
    this.$manualSelectForm.lastChild
      .querySelector('select')
      .addEventListener('change', this.onSelectQuantityApplier.bind(this));
    this.$manualSelectForm.lastChild
      .querySelector('.paper-remove-button')
      .addEventListener('click', this.onRemovePaper.bind(this));
  }

  onRemovePaper({ target }) {
    const currQuantity = target.parentNode.querySelector('select').value;

    target.parentNode.remove();
    this.setState({
      autoQuantity: this.autoQuantity + currQuantity,
      manualQuantity: this.manualQuantity - currQuantity,
    });
  }

  onSelectQuantityApplier({ target }) {
    const prevOption = target.querySelector('.selected');
    const prevQuantity = prevOption.value;
    const currQuantity = target.value;
    const currOption = target.querySelector(`[value="${currQuantity}"]`);
    const diffManualQuantity = currQuantity - prevQuantity;

    unselect(prevOption);
    select(currOption);
    this.setState({
      autoQuantity: this.autoQuantity - diffManualQuantity,
      manualQuantity: this.manualQuantity + diffManualQuantity,
    });
  }

  renderQuantitySummary() {
    this.$autoQuantity.innerText = this.autoQuantity;
    this.$manualQuantity.innerText = this.manualQuantity;
  }

  renderSection() {
    show(this.$purchaseOptionSection);
    show(this.$ticketIssueButton);
    show(this.$paperAdder);
    this.setState({ autoQuantity: this.stageManager.numOfLotto, manualQuantity: 0 });
  }

  setState({ autoQuantity, manualQuantity }) {
    this.autoQuantity = Number(autoQuantity);
    this.manualQuantity = Number(manualQuantity);
    this.renderQuantitySummary();
    this.autoQuantity === 0 ? disable(this.$paperAddButton) : enable(this.$paperAddButton);
  }
}
