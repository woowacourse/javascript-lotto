import CONFIG from '../constants/config.js';
import { MESSAGE } from '../constants/message.js';

const webOutputView = {
  printLottoCount(lottoCount) {
    const PURCHASE_SECTION = document.getElementById('purchaseResultSection');
    const purchaseDiv = document.createElement('div');
    PURCHASE_SECTION.replaceChildren();
    purchaseDiv.textContent = `${lottoCount}${MESSAGE.LOTTO_COUNT}`;
    PURCHASE_SECTION.appendChild(purchaseDiv);
  },

  convertLottoFormat(lotto) {
    return `🎟️ ${lotto.join(CONFIG.JOIN_SEPARATOR)}`;
  },

  printLottery(lottery) {
    const PURCHASE_SECTION = document.getElementById('purchaseResultSection');
    const fragment = document.createDocumentFragment();
    lottery.forEach(lotto => {
      const purchaseResultDiv = document.createElement('div');
      purchaseResultDiv.textContent = this.convertLottoFormat(lotto.numberList);
      fragment.appendChild(purchaseResultDiv);
    });
    PURCHASE_SECTION.appendChild(fragment);
  },
};

export default webOutputView;
