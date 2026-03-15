import Component from './Component.js';

const View = {
  purchaseAmountInput: document.getElementById('purchase-amount'),
  purchaseLottoContent: document.getElementById('purchase-lotto-content'),
  purchaseAmountErrorMessageContainer: document.getElementById(
    'purchase-amount-error-message-container'
  ),
  winningLottoNumberErrorMessageContainer: document.getElementById(
    'winning-lotto-error-message-container'
  ),
  winningLottoForm: document.getElementById('winning-lotto-form'),
  matchResultDialog: document.getElementById('lotto-match-result-dialog'),
  matchResultContent: document.getElementById('lotto-match-result-content'),

  openModal() {
    this.matchResultDialog.showModal();
  },

  closeModal() {
    this.matchResultDialog.close();
  },

  convertHiddenState(targets) {
    targets.forEach((target) => target.classList.toggle('hidden'));
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
    this.purchaseAmountErrorMessageContainer= '';
    const purchaseCountComponent = Component.purchaseLottoCount(lottos.length);
    const purchaseLottoListComponent = Component.lottoList(lottos.map((lotto) => lotto.getLottoNumber()));
    this.purchaseLottoContent.innerHTML = purchaseCountComponent + purchaseLottoListComponent;
  },

  renderMatchResultModal(matchResultSummary, rateOfReturn) {
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
