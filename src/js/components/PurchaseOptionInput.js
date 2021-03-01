import LottoPaper from '../model/LottoPaper.js';
import LottoTicket from '../model/LottoTicket.js';
import { getNthElementRemoved } from '../utils/general.js';
import { $, select, unselect, show, enable, disable, hide } from '../utils/DOM.js';
import { getSelectPaperHTML } from '../layouts/selectPaper.js';
import { PURCHASE_AMOUNT_SUBMITTED, TICKET_ISSUE_REQUESTED, APP_RESET } from '../constants/appStages.js';
import { TICKET_ISSUE_CONFIRM_MESSAGE } from '../constants/display.js';

export default class PurchaseOptionInput {
  constructor({ stageManager, lottoManager }) {
    this.stageManager = stageManager;
    this.lottoManager = lottoManager;
    this.maxIndex = 0;
    this.autoQuantity = 0;
    this.manualQuantity = 0;
    this.papers = [];

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
    this.stageManager.subscribe(PURCHASE_AMOUNT_SUBMITTED, this.showSection.bind(this));
    this.stageManager.subscribe(TICKET_ISSUE_REQUESTED, this.deactivateSection.bind(this));
    this.stageManager.subscribe(APP_RESET, this.resetSection.bind(this));
  }

  attachEvents() {
    this.$paperAddButton.addEventListener('click', this.onAddPaper.bind(this));
    this.$manualSelectForm.addEventListener('click', this.onRemovePaper.bind(this));
    this.$ticketIssueButton.addEventListener('click', this.onRequestIssueTickets.bind(this));
  }

  onAddPaper() {
    const newPaper = new LottoPaper(this.maxIndex);

    this.$manualSelectForm.insertAdjacentHTML('beforeEnd', getSelectPaperHTML({ issueNum: newPaper.issueNum }));

    const $paper = this.$manualSelectForm.lastChild;

    newPaper.setStates({
      $checkMessage: $paper.querySelector('.manual-select-check-message'),
      $quantitySelect: $paper.querySelector('.quantity-select'),
    });
    $paper.addEventListener('change', this.onChangePaper.bind(this));
    $paper.addEventListener('keyup', (e) => {
      if (e.key !== 'Enter') {
        return;
      }
      const target = e.target.parentNode.querySelector('input');

      target.checked = true;
      this.onChangePaper({ target, currentTarget: e.currentTarget });
    });

    this.setStates({
      autoQuantity: this.autoQuantity - newPaper.quantity,
      manualQuantity: this.manualQuantity + newPaper.quantity,
      papers: [...this.papers, newPaper],
      maxIndex: Number(this.maxIndex) + 1,
    });
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
    this.setStates({
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
      this.onChangeQuantityApplier({ target, lottoPaper });
    }
  }

  onChangeCheckbox({ target, lottoPaper }) {
    if (target.checked === false) {
      lottoPaper.remove(Number(target.value));
      this.render();
      return;
    }
    if (lottoPaper.isFulfilled) {
      target.checked = false;
      return;
    }
    lottoPaper.add(Number(target.value));
    this.render();
  }

  onChangeQuantityApplier({ target, lottoPaper }) {
    const prevOption = target.querySelector('.selected');
    const prevQuantity = Number(prevOption.value);
    const currQuantity = Number(target.value);
    const currOption = target.querySelector(`[value="${currQuantity}"]`);
    const diffManualQuantity = currQuantity - prevQuantity;

    unselect(prevOption);
    select(currOption);
    lottoPaper.setStates({ quantity: currQuantity });
    this.setStates({
      autoQuantity: this.autoQuantity - diffManualQuantity,
      manualQuantity: this.manualQuantity + diffManualQuantity,
    });
  }

  onRequestIssueTickets() {
    const response = window.confirm(
      TICKET_ISSUE_CONFIRM_MESSAGE({
        auto: this.autoQuantity,
        manual: this.manualQuantity,
      })
    );

    if (response === false) {
      return;
    }

    this.lottoManager.issueTickets({
      manualTickets: this.papers.reduce(
        (acc, cur) => acc.concat(...[...Array(cur.quantity)].map(() => new LottoTicket(cur.numbers))),
        []
      ),
    });
    this.stageManager.setStates({ stage: TICKET_ISSUE_REQUESTED });
  }

  setStates({ autoQuantity, manualQuantity, papers, maxIndex }) {
    this.autoQuantity = autoQuantity ?? this.autoQuantity;
    this.manualQuantity = manualQuantity ?? this.manualQuantity;
    this.papers = papers ?? this.papers;
    this.maxIndex = maxIndex ?? this.maxIndex;
    this.render();
  }

  showSection() {
    show(this.$purchaseOptionSection);
    show(this.$ticketIssueButton);
    show(this.$manualSelectForm);
    show(this.$paperAdder);
    this.setStates({ autoQuantity: this.lottoManager.numOfLotto, manualQuantity: 0 });
  }

  deactivateSection() {
    hide(this.$manualSelectForm);
    hide(this.$paperAdder);
    disable(this.$ticketIssueButton);
  }

  resetSection() {
    hide(this.$purchaseOptionSection);
    hide(this.$ticketIssueButton);
    this.$manualSelectForm.innerHTML = '';
    this.setStates({ autoQuantity: 0, manualQuantity: 0, papers: [], maxIndex: 0 });
  }

  updateEachPaperMaxQuantity() {
    this.papers.map((paper) => paper.setStates({ maxQuantity: paper.quantity + this.autoQuantity }));
  }

  render() {
    this.$autoQuantity.innerText = this.autoQuantity;
    this.$manualQuantity.innerText = this.manualQuantity;
    this.autoQuantity === 0 ? disable(this.$paperAddButton) : enable(this.$paperAddButton);
    this.papers.map((paper) => paper.setStates({ maxQuantity: paper.quantity + this.autoQuantity }));
    this.papers.every((paper) => paper.isFulfilled)
      ? enable(this.$ticketIssueButton)
      : disable(this.$ticketIssueButton);
  }
}
