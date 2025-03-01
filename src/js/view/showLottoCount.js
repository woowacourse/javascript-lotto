import SYSTEM_MESSAGE from '../../constants/systemMessage.js';
import { $ } from '../../util/selector.js';

export const showLottoCount = (lottoCount) => {
  const purchaseResult = $('.purchase-result');
  const lottoCountUI = document.createElement('p');
  lottoCountUI.textContent = SYSTEM_MESSAGE.COUNT(lottoCount);

  purchaseResult.appendChild(lottoCountUI);
};
