import {
  $purchaseItemCount,
  $purchaseItemList,
  $purchaseResult,
  $lottoNumbersToggleButton,
} from '../../elements.js';
import {
  getResultItemCountTemplate,
  getResultItemListTemplate,
} from '../templates.js';

const resultSection = {
  displayPurchaseResult(lottoItemList) {
    $purchaseResult.classList.remove('hide');
    $purchaseItemCount.innerHTML = getResultItemCountTemplate(
      lottoItemList.length,
    );
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoItemList);
  },

  hidePurchaseResult() {
    $purchaseResult.classList.add('hide');
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
    resultSection.hideLottoNumbers();
  },
};

export default resultSection;
