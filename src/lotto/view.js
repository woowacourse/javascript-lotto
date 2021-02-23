import {
  $modal,
  $costInput,
  $purchaseItemCount,
  $purchaseItemList,
  $purchaseResult,
  $lottoNumbersToggleButton,
  $resultTbody,
  $profitRate,
  $winningAndBonusNumberWrapper,
  $winningNumberInputForm,
} from '../elements.js';
import {
  getResultItemCountTemplate,
  getResultItemListTemplate,
  getModalTbodyTemplate,
} from '../templates.js';
import { $ } from '../utils/querySelector.js';

export default {
  init() {
    this.closeResultModal();
    this.hideLottoNumbers();
    this.initWinningNumberInputs();
    this.hideWinningNumberInputForm();
    $costInput.value = '';
    $purchaseResult.classList.add('hide');
  },

  initWinningNumberInputs() {
    $('input[data-custom-input]', $winningAndBonusNumberWrapper).forEach(
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
    this.displayWinningNumberInputForm();
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
};
