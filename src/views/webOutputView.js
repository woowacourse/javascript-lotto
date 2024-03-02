import CONFIG from '../constants/config';
import { MESSAGE } from '../constants/message';
import dom from '../utils/dom';

const webOutputView = {
  printLottoCount(lottoCount) {
    const $purchaseSection = document.getElementById('purchaseResultSection');
    $purchaseSection.replaceChildren();
    const purchaseResultTitle = dom.create('div', null, null, `${lottoCount}${MESSAGE.LOTTO_COUNT}`);
    $purchaseSection.appendChild(purchaseResultTitle);
  },

  convertLottoFormat(lotto) {
    return `🎟️ ${lotto.join(CONFIG.JOIN_SEPARATOR)}`;
  },

  printLottery(lottery) {
    const $purchaseSection = document.getElementById('purchaseResultSection');
    const fragment = document.createDocumentFragment();
    lottery.forEach(lotto => {
      const purchaseResult = dom.create('div', null, null, this.convertLottoFormat(lotto.numberList));
      fragment.appendChild(purchaseResult);
    });
    $purchaseSection.appendChild(fragment);
  },

  printLottoResult(createTableCallback, ranks) {
    const { createLottoResultTitle, createLottoResultTable } = createTableCallback;
    const $lottoResultTable = document.getElementById('lottoResultTable');
    $lottoResultTable.replaceChildren();
    const lottoResultRowTitle = createLottoResultTitle();
    const lottoResultTableFragment = createLottoResultTable(ranks);
    $lottoResultTable.appendChild(lottoResultRowTitle);
    $lottoResultTable.appendChild(lottoResultTableFragment);
  },

  printProfit(profit) {
    const $lottoResultTable = document.getElementById('lottoResultTable');
    const lottoProfitWrapper = dom.create('div', 'lottoProfitWrapper', null);
    const profitText = dom.create('div', 'profitText', null, `당신의 총 수익률은 ${profit} %입니다.`);
    lottoProfitWrapper.appendChild(profitText);
    $lottoResultTable.appendChild(lottoProfitWrapper);
  },
};

export default webOutputView;
