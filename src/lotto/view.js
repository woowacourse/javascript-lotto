import { CSS_CLASS } from '../constants.js';
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
    $purchaseItemList.classList.add(CSS_CLASS.LOTTO_NUMBERS_REMOVED);
    $purchaseItemList.classList.remove(CSS_CLASS.FLEX_DIRECTION_COLUMN);
  },

  showPurchaseResult(lottoItemList) {
    $purchaseResult.classList.remove(CSS_CLASS.REMOVED);
    $purchaseItemList.classList.remove(CSS_CLASS.REMOVED);
    $purchaseItemCount.innerHTML = getResultItemCountTemplate(
      lottoItemList.length
    );
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoItemList);
    view.showWinningNumberForm();
  },

  showWinningNumberForm() {
    $winningNumberInputForm.classList.remove(CSS_CLASS.REMOVED);
  },
  
  showLottoNumbers() {
    $purchaseItemList.classList.add(CSS_CLASS.FLEX_DIRECTION_COLUMN);
    $purchaseItemList.classList.remove(CSS_CLASS.LOTTO_NUMBERS_REMOVED);
  },

  showResultModal(rankItemList, profitRate) {
    $modal.classList.add(CSS_CLASS.OPEN);
    $resultTbody.innerHTML = getModalTbodyTemplate(rankItemList);
    $profitRate.innerText = profitRate;
  },

  showMessage(message) {
    alert(message);
  },

  hideLottoNumbers() {
    $purchaseItemList.classList.remove(CSS_CLASS.FLEX_DIRECTION_COLUMN);
    $purchaseItemList.classList.add(CSS_CLASS.LOTTO_NUMBERS_REMOVED);
  },

  hideResultModal() {
    $modal.classList.remove(CSS_CLASS.OPEN);
  },

  hideWinningNumberInputForm() {
    $winningNumberInputForm.classList.add(CSS_CLASS.REMOVED);
  },

  hidePurchaseResult(){
    $purchaseResult.classList.add(CSS_CLASS.REMOVED);
  }
};

export default view;
