import LottoItem from './LottoItem.js';

const LottoInfo = {
  render(target, lottos) {
    const lottoInfoContainer = document.createElement('div');
    lottoInfoContainer.id = 'lotto-info-container';
    target.appendChild(lottoInfoContainer);

    lottos.forEach((lotto) => LottoItem.render(lottoInfoContainer, lotto));
  },
};

export default LottoInfo;
