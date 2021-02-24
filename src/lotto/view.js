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
  init() {
    view.closeResultModal();
    view.hideLottoNumbers();
    view.hideWinningNumberInputForm();
    view.hideResult()
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

  displayResult(lottoItemList) {
    $purchaseResult.classList.remove('hide');
    $purchaseItemList.classList.remove('hide');
    $purchaseItemCount.innerHTML = getResultItemCountTemplate(
      lottoItemList.length
    );
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoItemList);
    view.displayWinningNumberInputForm();
  },

  hideResult(){
    $purchaseResult.classList.add('hide');
  },

  displayWinningNumberInputForm() {
    $winningNumberInputForm.classList.remove('hide');
  },

  hideWinningNumberInputForm() {
    $winningNumberInputForm.classList.add('hide');
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
    $purchaseItemList.classList.add('hide-lotto-numbers');
    $purchaseItemList.classList.remove('flex-col');
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
