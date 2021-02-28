import LottoPaper from '../model/LottoPaper.js';
import LottoTicket from '../model/LottoTicket.js';
import { getNthElementRemoved } from '../utils/general.js';
import { $, select, unselect, show, enable, disable, hide } from '../utils/DOM.js';
import { getSelectPaperHTML } from '../layouts/selectPaper.js';
import { PURCHASE_AMOUNT_SUBMITTED, TICKET_ISSUE_REQUESTED, APP_RESET } from '../constants/appStages.js';
import { TICKET_ISSUE_CONFIRM_MESSAGE } from '../constants/display.js';

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
    this.stageManager.subscribe(PURCHASE_AMOUNT_SUBMITTED, this.renderSection.bind(this));
    this.stageManager.subscribe(APP_RESET, this.reset.bind(this));
  }

  attachEvents() {
    this.$paperAddButton.addEventListener('click', this.onAddPaper.bind(this));
    this.$manualSelectForm.addEventListener('click', this.onRemovePaper.bind(this));
    this.$ticketIssueButton.addEventListener('click', this.onRequestIssueTickets.bind(this));
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
    newPaper.$checkMessage = this.$manualSelectForm.lastChild.querySelector('.manual-select-check-message');
    this.$manualSelectForm.lastChild.addEventListener('change', this.onChangePaper.bind(this));
  }

  onRemovePaper({ target }) {
    if (target.type !== 'button') {
      return;
    }
    const $paper = target.parentNode;
    const issueNum = Number($paper.dataset.issueNum);
    const targeIndex = this.papers.map((paper) => paper.issueNum).indexOf(issueNum);
    const currQuantity = Number($paper.querySelector('select').value);

    target.parentNode.remove();
    this.setState({
      autoQuantity: this.autoQuantity + currQuantity,
      manualQuantity: this.manualQuantity - currQuantity,
      papers: getNthElementRemoved(this.papers, targeIndex),
    });
  }

  onChangePaper({ target, currentTarget }) {
    const targetIssueNum = Number(currentTarget.dataset.issueNum);
    const lottoPaper = this.papers.find((paper) => paper.issueNum === targetIssueNum);

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

  onRequestIssueTickets() {
    const response = window.confirm(
      TICKET_ISSUE_CONFIRM_MESSAGE({ auto: this.autoQuantity, manual: this.manualQuantity })
    );

    if (response === false) {
      return;
    }

    const manualLottoTickets = this.papers.reduce(
      (acc, cur) => acc.concat(...[...Array(cur.quantity)].map(() => new LottoTicket(cur.numbers))),
      []
    );

    this.stageManager.setStates({
      stage: TICKET_ISSUE_REQUESTED,
      lottoTickets: manualLottoTickets,
    });
    hide(this.$manualSelectForm);
    hide(this.$paperAdder);
    disable(this.$ticketIssueButton);
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
    this.manualQuantity = manualQuantity ?? this.manualQuantity;
    this.papers = papers ?? this.papers;
    this.maxIndex = maxIndex ?? this.maxIndex;

    this.renderQuantitySummary();
    this.autoQuantity === 0 ? disable(this.$paperAddButton) : enable(this.$paperAddButton);
    this.papers.every((paper) => paper.isFulfilled)
      ? enable(this.$ticketIssueButton)
      : disable(this.$ticketIssueButton);
  }

  reset() {
    hide(this.$purchaseOptionSection);
    hide(this.$ticketIssueButton);
    this.setState({ autoQuantity: 0, manualQuantity: 0, papers: [], maxIndex: 0 });
  }
}
