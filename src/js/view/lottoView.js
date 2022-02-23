import { createElementWithClassName, selectDom } from '../utils/utils';

class LottoView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.purchasedLottoSection = selectDom('.purchased-lotto-section');
    this.winnerNumberSection = selectDom('.winner-number-section');
    this.lottoShowContainer = selectDom('.lotto-show-container');
    this.lottoNumberContainer = selectDom('.lotto-number-container', this.purchasedLottoSection);
  }

  renderLottos(lottos) {
    this.purchasedLottoSection.classList.remove('hide');
    this.winnerNumberSection.classList.remove('hide');

    const labelElement = document.createElement('label');
    labelElement.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
    this.lottoShowContainer.prepend(labelElement);
    this.lottoNumberContainer.append(...LottoView.generateLottoElementTemplate(lottos));
  }

  static generateLottoElementTemplate(lottos) {
    return lottos.map((lotto) => LottoView.generateLottoElement(lotto));
  }

  static generateLottoElement(lotto) {
    const lottoElement = createElementWithClassName('div', 'lotto');
    const lottoImage = createElementWithClassName('p', 'lotto-image');
    lottoImage.textContent = '🎟️';
    const lottoNumbers = createElementWithClassName('p', 'lotto-numbers');
    lottoNumbers.classList.add('hide');
    lottoNumbers.textContent = Array.from(lotto.lottoNumbers).join(', ');
    lottoElement.append(lottoImage, lottoNumbers);
    return lottoElement;
  }
}
export default LottoView;
