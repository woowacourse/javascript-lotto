import Component from './Component.js';

const View = {
  init() {
  this.purchaseAmountInput = document.getElementById('purchase-amount');
  this.purchaseAmountSubmitButton = document.querySelector('#purchase-amount-form button');
  this.purchaseLottoContent = document.getElementById('purchase-lotto-content');
  this.purchaseAmountErrorMessageContainer = document.getElementById(
    'purchase-amount-error-message-container'
  );
  this.winningLottoNumberErrorMessageContainer = document.getElementById(
    'winning-lotto-error-message-container'
  );
  this.winningLottoForm = document.getElementById('winning-lotto-form');
  this.matchResultDialog = document.getElementById('lotto-match-result-dialog');
  this.matchResultContent = document.getElementById('lotto-match-result-content');
  },

  openModal() {
    this.matchResultDialog.showModal();
  },

  closeModal() {
    this.matchResultDialog.close();
  },

  show(targets) {
    targets.forEach((target) => target.classList.remove('hidden'));
  },

  hide(targets) {
    targets.forEach((target) => target.classList.add('hidden'));
  },

  disabled(targets) {
    targets.forEach((target) => (target.disabled = true));
  },

  enabled(targets) {
    targets.forEach((target) => (target.disabled = false));
  },

  clearErrorMessage(target) {
    target.innerHTML = '';
  },

  renderPurchaseAmountErrorMessage(message) {
    const errorMessageComponent = Component.errorMessage(message);
    this.purchaseAmountErrorMessageContainer.innerHTML = errorMessageComponent;
  },

  renderWinningLottoNumberErrorMessage(message) {
    const errorMessageComponent = Component.errorMessage(message);
    this.winningLottoNumberErrorMessageContainer.innerHTML = errorMessageComponent;
  },

  renderPurchaseLotto(lottos) {
    this.clearErrorMessage(this.purchaseAmountErrorMessageContainer);
    this.purchaseAmountErrorMessageContainer= '';
    const purchaseCountComponent = Component.purchaseLottoCount(lottos.length);
    const purchaseLottoListComponent = Component.lottoList(lottos.map((lotto) => lotto.getLottoNumber()));
    this.purchaseLottoContent.innerHTML = purchaseCountComponent + purchaseLottoListComponent;
  },

  renderMatchResultModal(matchResultSummary, rateOfReturn) {
    this.clearErrorMessage(this.winningLottoNumberErrorMessageContainer);
    const table = Component.lottoMatchResultTable(matchResultSummary);
    const rateOfReturnMessage = Component.rateOfReturnMessage(rateOfReturn);
    const restartButton = Component.restartButton();
    this.matchResultContent.innerHTML = table + rateOfReturnMessage + restartButton;
  },

  clearAllInput() {
    this.purchaseAmountInput.value = '';
    this.purchaseLottoContent.innerHTML = '';
    this.matchResultContent.innerHTML = '';
    this.winningLottoForm.reset();
  }
}

export default View;
