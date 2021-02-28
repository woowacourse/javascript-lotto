import LottoPaper from '../model/LottoPaper.js';
import { PURCHASE_AMOUNT_COMPLETED } from '../constants/appStages.js';
import { getSelectPaperHTML } from '../layouts/selectPaper.js';
import { $, select, unselect, show, enable, disable } from '../utils/DOM.js';
import { getNthElementRemoved } from '../utils/general.js';

export default class PurchaseOptionInput {
  constructor({ stageManager }) {
    this.stageManager = stageManager;
    this.autoQuantity = 0;
    this.manualQuantity = 0;
    this.papers = [];
    this.maxIndex = 0;

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
    this.$manualSelectForm.addEventListener('click', this.onRemovePaper.bind(this));
  }

  onAddPaper() {
    const newPaper = new LottoPaper(this.maxIndex);

    this.setState({
      autoQuantity: this.autoQuantity - newPaper.quantity,
      manualQuantity: this.manualQuantity + newPaper.quantity,
      papers: [...this.papers, newPaper],
      maxIndex: Number(this.maxIndex) + 1,
    });
    this.$manualSelectForm.insertAdjacentHTML(
      'beforeEnd',
      getSelectPaperHTML({ issueNum: newPaper.issueNum, maxQuantity: newPaper.quantity + this.autoQuantity })
    );
    newPaper.$checkMessage = this.$manualSelectForm.querySelector('.manual-select-check-message');
    this.$manualSelectForm.lastChild.addEventListener('change', this.onChangePaper.bind(this));
  }

  onRemovePaper({ target }) {
    if (target.type !== 'button') {
      return;
    }
    const $paper = target.parentNode;
    const currQuantity = Number($paper.querySelector('select').value);
    const targeIndex = this.papers.map((paper) => paper.issueNum).indexOf($paper.dataset.issueNum);

    target.parentNode.remove();
    this.setState({
      autoQuantity: this.autoQuantity + currQuantity,
      manualQuantity: this.manualQuantity - currQuantity,
      papers: getNthElementRemoved(this.papers, targeIndex),
    });
  }

  onChangePaper({ target, currentTarget }) {
    const lottoPaper = this.papers[currentTarget.dataset.issueNum];

    if (target.type === 'checkbox') {
      this.onChangeCheckbox({ target, lottoPaper });
      return;
    }
    if (target.type === 'select-one') {
      this.onSelectQuantityApplier({ target, lottoPaper });
    }
  }

  onChangeCheckbox({ target, lottoPaper }) {
    if (target.checked === false) {
      lottoPaper.remove(target.value);
      this.setState({});
      return;
    }
    if (lottoPaper.isFulfilled) {
      target.checked = false;
      return;
    }
    lottoPaper.add(target.value);
    this.setState({});
  }

  onSelectQuantityApplier({ target, lottoPaper }) {
    const prevOption = target.querySelector('.selected');
    const prevQuantity = Number(prevOption.value);
    const currQuantity = Number(target.value);
    const currOption = target.querySelector(`[value="${currQuantity}"]`);
    const diffManualQuantity = currQuantity - prevQuantity;

    unselect(prevOption);
    select(currOption);
    lottoPaper.setState({ quantity: currQuantity });
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

  setState({ autoQuantity, manualQuantity, papers, maxIndex }) {
    this.autoQuantity = autoQuantity ?? this.autoQuantity;
    this.manualQuantity = manualQuantity ?? this.autoQuantity;
    this.papers = papers ?? this.papers;
    this.maxIndex = maxIndex ?? this.maxIndex;

    this.renderQuantitySummary();
    this.autoQuantity === 0 ? disable(this.$paperAddButton) : enable(this.$paperAddButton);
    this.papers.every((paper) => paper.isFulfilled)
      ? enable(this.$ticketIssueButton)
      : disable(this.$ticketIssueButton);
  }
}
