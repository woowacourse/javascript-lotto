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

    const lottoInfoContainer = document.createElement('div');
    lottoInfoContainer.id = 'lotto-info-container';

    const { lottos } = userLottoStore.getState();
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
