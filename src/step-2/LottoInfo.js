import LottoItem from './LottoItem.js';
import { userLottoStore } from './stores.js';

const LottoInfo = {
  render(container) {
    this.init();

    if (!userLottoStore.hasTrigger('lotto-info')) {
      userLottoStore.appendTrigger(
        'lotto-info', () => this.render(container),
      );
    }

    const { lottos } = userLottoStore.getState();
    if (lottos.length === 0) return;

    const lottoInfoContainer = document.createElement('div');
    const purchaseCountDiv = document.createElement('div');
    const lottoListContainer = document.createElement('div');

    lottoInfoContainer.id = 'lotto-info-container';
    lottoInfoContainer.classList.add('lotto-info-container');

    purchaseCountDiv.innerText = `총 ${lottos.length}개를 구매하였습니다.`;

    lottoListContainer.id = 'lotto-list-container';
    lottoListContainer.classList.add('lotto-list-container');

    lottoInfoContainer.appendChild(purchaseCountDiv);
    lottos.forEach((lotto) => LottoItem.render(lottoInfoContainer, { lotto }));

    container.appendChild(lottoInfoContainer);
  },

  init() {
    const lottoInfoContainer = document.getElementById('lotto-info-container');
    if (lottoInfoContainer) {
      lottoInfoContainer.remove();
    }
  },
};

export default LottoInfo;
