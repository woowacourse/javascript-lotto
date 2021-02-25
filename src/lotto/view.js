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
  $correctNumberInputForm,
  $$correctNumberInputs,
} from '../elements.js';
import {
  getResultItemCountTemplate,
  getResultItemListTemplate,
  getModalTbodyTemplate,
} from '../templates.js';
import { $ } from '../utils/querySelector.js';

const view = {
  init() {
    view.closeResultModal();
    view.hidePurchaseResult()
    view.hideCorrectNumberInputForm();
    $costInput.value = '';
    $$correctNumberInputs.forEach(
      ($correctNumberInput) => $correctNumberInput.value = '');
  },

  displayPurchaseResult(lottoItemList) {
    $purchaseResult.classList.remove('hide');
    $purchaseItemCount.innerHTML = getResultItemCountTemplate(lottoItemList.length);
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoItemList);
    view.displayCorrectNumberInputForm();
  },

  hidePurchaseResult(){
    $purchaseResult.classList.add('hide');
  },

  displayCorrectNumberInputForm() {
    $correctNumberInputForm.classList.remove('hide');
  },

  hideCorrectNumberInputForm() {
    $correctNumberInputForm.classList.add('hide');
  },

  displayLottoNumbers() {
    $purchaseItemList.classList.add('flex-col');
    $purchaseItemList.classList.remove('hide-lotto-numbers');
  },

  hideLottoNumbers() {
    $purchaseItemList.classList.remove('flex-col');
    $purchaseItemList.classList.add('hide-lotto-numbers');
  },

  resetToggleButton() {
    $lottoNumbersToggleButton.checked = false;
    view.hideLottoNumbers();
  },

  openResultModal(rankItemList, profitRate) {
    $modal.classList.add('open');
    $resultTbody.innerHTML = getModalTbodyTemplate(rankItemList);
    $profitRate.innerText = profitRate;
  },

  closeResultModal() {
    $modal.classList.remove('open');
  },

  showMessage(message) {
    alert(message);
  }
};

export default view;
