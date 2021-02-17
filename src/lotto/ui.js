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
import { $$ } from '../utils/querySelector.js';

export default {
  renderResult(lottoItemList) {
    $purchaseResult.style.display = 'block';
    $purchaseItemCount.innerHTML = getResultItemCountTemplate(lottoItemList.length);
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoItemList);
  },
  displayLottoNumbers() {
    $$('.lotto-numbers').forEach(($lottoNumbers) => {
      $lottoNumbers.style.display = 'inline-block';
    });
    $purchaseItemList.style.flexDirection = 'column';
  },
  hideLottoNumbers() {
    $$('.lotto-numbers').forEach(($lottoNumbers) => {
      $lottoNumbers.style.display = 'none';
    });
    $purchaseItemList.style.flexDirection = '';
  },
  resetToggleButton() {
    $lottoNumbersToggleButton.checked = false;
  },
};
