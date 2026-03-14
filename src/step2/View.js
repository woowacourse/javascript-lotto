import Component from './Component.js';

const View = {
  clearErrorMessage(target) {
    target.innerHTML = '';
  },

  renderErrorMessage(target, message) {
    const errorMessageComponent = Component.errorMessage(message);
    target.innerHTML = errorMessageComponent;
  },

  renderPurchaseLotto(target, lottos) {
    const purchaseCountComponent = Component.purchaseLottoCount(lottos.length);
    const purchaseLottoListComponent = Component.lottoList(lottos.map((lotto) => lotto.getLottoNumber()));
    target.innerHTML = purchaseCountComponent + purchaseLottoListComponent;
  },

  renderMatchResultModal(target, matchResultSummary, rateOfReturn) {
    const table = Component.lottoMatchResultTable(matchResultSummary);
    const rateOfReturnMessage = Component.rateOfReturnMessage(rateOfReturn);
    const restartButton = Component.restartButton();
    target.innerHTML = table + rateOfReturnMessage + restartButton;
  }
}

export default View;
