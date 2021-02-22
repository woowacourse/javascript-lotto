import {
  $purchaseItemCount,
  $purchaseItemList,
  $purchaseResult,
  $lottoNumbersToggleButton,
} from '../elements.js';
import {
  getResultItemCountTemplate,
  getResultItemListTemplate,
} from '../templates.js';

export default {
  renderResult(lottoItemList) {
    $purchaseResult.classList.remove('hide');
    $purchaseItemList.classList.remove('hide');
    $purchaseItemCount.innerHTML = getResultItemCountTemplate(lottoItemList.length);
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoItemList);
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
};
