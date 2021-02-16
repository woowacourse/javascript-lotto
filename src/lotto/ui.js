import {
  $purchaseControl,
  $purchaseItemList,
  $purchaseResult,
} from '../elements.js';
import {
  getResultControlTemplate,
  getResultItemListTemplate,
} from '../templates.js';

export default {
  renderResult(lottoItemCount) {
    $purchaseResult.style.display = 'block';
    $purchaseControl.innerHTML = getResultControlTemplate(lottoItemCount);
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoItemCount);
  },
};
