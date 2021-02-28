import {
  $modal,
  $costInput,
  $choicePurchaseMethod,
  $remainLottoCountText,
  $autoCountForm,
  $manualLottoNumbersForm,
  $purchaseItemCount,
  $purchaseItemList,
  $purchaseResult,
  $remainCount,
  $lottoNumbersToggleButton,
  $resultTbody,
  $profitRate,
  $correctNumberInputForm,
  $$correctNumberInputs,
} from '../elements.js';
import {
  getResultItemCountTemplate,
  getResultItemListTemplate,
  getModalTbodyTemplate,
} from './templates.js';

const view = {
  init() {
    view.closeResultModal();
    view.hidePurchaseResult();
    view.hideCorrectNumberInputForm();
    $costInput.value = '';
    $$correctNumberInputs.forEach(
      ($correctNumberInput) => ($correctNumberInput.value = ''),
    );
  },

  displayChoiceMethodButton() {
    $choicePurchaseMethod.classList.remove('hide');
  },

  hideChoiceMethodButton() {
    $choicePurchaseMethod.classList.add('hide');
  },

  displayRemainLottoNumberCount(count) {
    $remainCount.innerText = count;
    $remainLottoCountText.classList.remove('hide');
  },

  hideRemainLottoNumberCount() {
    $remainLottoCountText.classList.add('hide');
  },

  displayAutoCountForm() {
    $autoCountForm.classList.remove('hide');
  },

  hideAutoCountForm() {
    $autoCountForm.classList.add('hide');
  },

  displayManualLottoNumbersForm() {
    $manualLottoNumbersForm.classList.remove('hide');
  },

  hideManualLottoNumbersForm() {
    $manualLottoNumbersForm.classList.add('hide');
  },

  displayPurchaseResult(lottoItemList) {
    $purchaseResult.classList.remove('hide');
    $purchaseItemCount.innerHTML = getResultItemCountTemplate(
      lottoItemList.length,
    );
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoItemList);
    view.displayCorrectNumberInputForm();
  },

  hidePurchaseResult() {
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
  },
};

export default view;
