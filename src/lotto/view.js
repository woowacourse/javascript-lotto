import {
  $modal,
  $purchaseItemCount,
  $purchaseItemList,
  $purchaseResult,
  $lottoNumbersToggleButton,
  $resultTbody,
  $profitRate
} from '../elements.js';
import {
  getResultItemCountTemplate,
  getResultItemListTemplate,
  getModalTbodyTemplate
} from '../templates.js';

export default {
  renderResult(lottoItemList) {
    $purchaseResult.classList.remove('hide');
    $purchaseItemList.classList.remove('hide');
    $purchaseItemCount.innerHTML = getResultItemCountTemplate(
      lottoItemList.length
    );
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
  openResultModal(rankItemList, profitRate) {
    $modal.classList.add('open');
    $resultTbody.innerHTML = getModalTbodyTemplate(rankItemList);
    $profitRate.innerText = profitRate;
  },
  closeResultModal() {
    $modal.classList.remove('open');
  }
};
