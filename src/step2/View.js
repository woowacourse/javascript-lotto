import Component from './Component.js';

const View = {
  openModal() {
    document.getElementById('lotto-match-result-dialog').showModal();
  },

  closeModal() {
    document.getElementById('lotto-match-result-dialog').close();
  },

  convertHiddenState(targets) {
    targets.forEach((target) => target.classList.toggle('hidden'));
  },

  clearErrorMessage(target) {
    target.innerHTML = '';
  },

  renderPurchaseAmountErrorMessage(message) {
    const target = document.getElementById('purchase-amount-error-message-container');
    const errorMessageComponent = Component.errorMessage(message);
    target.innerHTML = errorMessageComponent;
  },

  renderWinningLottoNumberErrorMessage(message) {
    const target = document.getElementById('winning-lotto-error-message-container');
    const errorMessageComponent = Component.errorMessage(message);
    target.innerHTML = errorMessageComponent;
  },

  renderPurchaseLotto(lottos) {
    document.getElementById('purchase-amount-error-message-container').innerHTML = '';
    const purchaseLottoContentContainer = document.getElementById('purchase-lotto-content');
    const purchaseCountComponent = Component.purchaseLottoCount(lottos.length);
    const purchaseLottoListComponent = Component.lottoList(lottos.map((lotto) => lotto.getLottoNumber()));
    purchaseLottoContentContainer.innerHTML = purchaseCountComponent + purchaseLottoListComponent;
  },

  renderMatchResultModal(matchResultSummary, rateOfReturn) {
    const target = document.getElementById('lotto-match-result-content');
    const table = Component.lottoMatchResultTable(matchResultSummary);
    const rateOfReturnMessage = Component.rateOfReturnMessage(rateOfReturn);
    const restartButton = Component.restartButton();
    target.innerHTML = table + rateOfReturnMessage + restartButton;
  },

  clearAllInput() {
    document.getElementById('purchase-amount').value = '';
    document.getElementById('purchase-lotto-content').innerHTML = '';
    document.getElementById('lotto-match-result-content').innerHTML = '';
    document.getElementById('winning-lotto-form').reset();
  }
}

export default View;
