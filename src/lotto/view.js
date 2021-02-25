import {
  $modal,
  $costInput,
  $purchaseItemCount,
  $purchaseItemList,
  $purchaseResult,
  $lottoNumbersToggleButton,
  $resultTbody,
  $profitRate,
  $correctNumberWrapper,
  $winningNumberInputForm,
} from '../elements.js';
import {
  getResultItemCountTemplate,
  getResultItemListTemplate,
  getModalTbodyTemplate,
} from '../templates.js';
import { $ } from '../utils/querySelector.js';

const view = {
  initLottoGame() {
    view.hideResultModal();
    view.hideLottoNumbers();
    view.hideWinningNumberInputForm();
    view.hidePurchaseResult()
    view.initWinningNumberInputs();
    $costInput.value = '';
  },

  initWinningNumberInputs() {
    $('input[data-custom-input]', $correctNumberWrapper).forEach(
      ($numberInput) => {
        $numberInput.value = '';
      }
    );
  },

  initToggleButton() {
    $lottoNumbersToggleButton.checked = false;
    $purchaseItemList.classList.add('hide-lotto-numbers');
    $purchaseItemList.classList.remove('flex-col');
  },

  showPurchaseResult(lottoItemList) {
    $purchaseResult.classList.remove('hide');
    $purchaseItemList.classList.remove('hide');
    $purchaseItemCount.innerHTML = getResultItemCountTemplate(
      lottoItemList.length
    );
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoItemList);
    view.showWinningNumberForm();
  },

  showWinningNumberForm() {
    $winningNumberInputForm.classList.remove('hide');
  },
  
  showLottoNumbers() {
    $purchaseItemList.classList.add('flex-col');
    $purchaseItemList.classList.remove('hide-lotto-numbers');
  },

  showResultModal(rankItemList, profitRate) {
    $modal.classList.add('open');
    $resultTbody.innerHTML = getModalTbodyTemplate(rankItemList);
    $profitRate.innerText = profitRate;
  },

  showMessage(message) {
    alert(message);
  },

  hideLottoNumbers() {
    $purchaseItemList.classList.remove('flex-col');
    $purchaseItemList.classList.add('hide-lotto-numbers');
  },

  hideResultModal() {
    $modal.classList.remove('open');
  },

  hideWinningNumberInputForm() {
    $winningNumberInputForm.classList.add('hide');
  },

  hidePurchaseResult(){
    $purchaseResult.classList.add('hide');
  }
};

export default view;
