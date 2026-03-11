import LottoItem from './LottoItem.js';
import { userLottoStore } from './stores.js';

const LottoInfo = {
  render(target) {
    if (!userLottoStore.hasTrigger('lotto-info')) {
      userLottoStore.appendTrigger(
        'lotto-info', () => LottoInfo.render(target),
      );
    }
    
    const lottoInfoContainer = document.createElement('div');
    lottoInfoContainer.id = 'lotto-info-container';

    const { lottos } = userLottoStore.getState();
    lottos.forEach((lotto) => LottoItem.render(lottoInfoContainer, lotto));

    target.appendChild(lottoInfoContainer);
  },
};

export default LottoInfo;
