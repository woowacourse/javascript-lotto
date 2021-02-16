import {
  $purchaseItemCount,
  $purchaseItemList,
  $purchaseResult,
} from '../elements.js';
import {
  getResultControlTemplate,
  getResultItemListTemplate,
} from '../templates.js';
import { $$ } from '../utils/querySelector.js';

export default {
  renderResult(lottoList) {
    $purchaseResult.style.display = 'block';
    $purchaseItemCount.innerHTML = getResultControlTemplate(lottoList.length);
    $purchaseItemList.innerHTML = getResultItemListTemplate(lottoList);
  },
  displayLottoNumbers() {
    $$('.lotto-numbers').forEach(($lottoNumbers) => {
      $lottoNumbers.style.display = 'inline-block';
    });
  },
  hideLottoNumbers() {
    $$('.lotto-numbers').forEach(($lottoNumbers) => {
      $lottoNumbers.style.display = 'none';
    });
  },
};
