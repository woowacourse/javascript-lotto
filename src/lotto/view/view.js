import { CSS_CLASS } from '../../constants.js';
import {
  $depositInput,
  $depositPresenter,
  $result,
  $resultItemCount,
  $resultItemList,
  $resultNumbersToggleButton,
  $modal,
  $modalTbody,
  $profitRate,
  $correctNumberInputWrapper,
  $correctNumber
} from '../../elements.js';
import {
  getResultItemCountTemplate,
  getResultItemListTemplate,
  getModalTbodyTemplate,
} from './templates.js';
import { $ } from '../../utils/querySelector.js';

const view = {
  initLottoGame(initialDeposit) {
    if (Number.isNaN(initialDeposit)) return;

    view.hideResultModal();
    view.hideLottoNumbers();
    view.hideWinningNumberInputForm();
    view.hidePurchaseResult()
    view.initWinningNumberInputs();
    view.emptyCostInput();
    view.showDeposit(initialDeposit);
  },

  initWinningNumberInputs() {
    $('input[data-custom-input]', $correctNumberInputWrapper).forEach(
      ($numberInput) => {
        $numberInput.value = '';
      }
    );
  },

  initToggleButton() {
    $resultNumbersToggleButton.checked = false;
    $resultItemList.classList.add(CSS_CLASS.LOTTO_NUMBERS_REMOVED);
    $resultItemList.classList.remove(CSS_CLASS.FLEX_DIRECTION_COLUMN);
  },

  showPurchaseResult(lottoItemList) {
    $result.classList.remove(CSS_CLASS.REMOVED);
    $resultItemList.classList.remove(CSS_CLASS.REMOVED);
    $resultItemCount.innerHTML = getResultItemCountTemplate(
      lottoItemList.length
    );
    $resultItemList.innerHTML = getResultItemListTemplate(lottoItemList);
    view.showWinningNumberForm();
  },

  showWinningNumberForm() {
    $correctNumber.classList.remove(CSS_CLASS.REMOVED);
  },
  
  showLottoNumbers() {
    $resultItemList.classList.add(CSS_CLASS.FLEX_DIRECTION_COLUMN);
    $resultItemList.classList.remove(CSS_CLASS.LOTTO_NUMBERS_REMOVED);
  },

  showResultModal(rankItemList, profitRate) {
    $modal.classList.add(CSS_CLASS.OPEN);
    $modalTbody.innerHTML = getModalTbodyTemplate(rankItemList);
    $profitRate.innerText = profitRate;
  },

  showDeposit(deposit) {
    $depositPresenter.innerText = deposit;
  },

  showMessage(message) {
    if (typeof message !== 'string' || message.length === 0) return;
    
    alert(message);
  },

  tryConfirm(message) {
    if (typeof message !== 'string' || message.length === 0) return;

    return confirm(message);
  },

  hideLottoNumbers() {
    $resultItemList.classList.remove(CSS_CLASS.FLEX_DIRECTION_COLUMN);
    $resultItemList.classList.add(CSS_CLASS.LOTTO_NUMBERS_REMOVED);
  },

  hideResultModal() {
    $modal.classList.remove(CSS_CLASS.OPEN);
  },

  hideWinningNumberInputForm() {
    $correctNumber.classList.add(CSS_CLASS.REMOVED);
  },

  hidePurchaseResult(){
    $result.classList.add(CSS_CLASS.REMOVED);
  },

  emptyCostInput() {
    $depositInput.value = '';
  }
};

export default view;
