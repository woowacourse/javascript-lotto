import { SELECTOR } from '../constants/constants';
import { createElementWithClassName, selectDom } from '../utils/utils';

class LottoView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.purchasedLottoSection = selectDom(SELECTOR.PURCHASED_LOTTO_SECTION_CLASS);
    this.winnerNumberSection = selectDom(SELECTOR.WINNER_NUMBER_SECTION_CLASS);
    this.lottoShowContainer = selectDom(SELECTOR.LOTTO_SHOW_CONTAINER_CLASS);
    this.lottoNumberContainer = selectDom(
      SELECTOR.LOTTO_NUMBER_CONTAINER_CLASS,
      this.purchasedLottoSection
    );
  }

  renderLottos(lottos) {
    this.purchasedLottoSection.classList.remove(SELECTOR.HIDE_CLASSNAME);
    this.winnerNumberSection.classList.remove(SELECTOR.HIDE_CLASSNAME);

    this.lottoShowContainer.prepend(LottoView.generatePurchasedLabel(lottos.length));
    this.lottoNumberContainer.append(...LottoView.generateLottoElementTemplate(lottos));
  }

  static generatePurchasedLabel(length) {
    const labelElement = document.createElement('label');
    labelElement.textContent = `총 ${length}개를 구매하였습니다.`;
    return labelElement;
  }

  static generateLottoElementTemplate(lottos) {
    return lottos.map((lotto) => LottoView.generateLottoElement(lotto));
  }

  static generateLottoElement(lotto) {
    const lottoElement = createElementWithClassName('div', SELECTOR.LOTTO_CLASSNAME);

    const lottoImage = createElementWithClassName('p', SELECTOR.LOTTO_IMAGE_CLASSNAME);
    lottoImage.textContent = '🎟️';

    const lottoNumbers = createElementWithClassName('p', SELECTOR.LOTTO_NUMBERS_CLASSNAME);
    lottoNumbers.classList.add(SELECTOR.HIDE_CLASSNAME);
    lottoNumbers.textContent = Array.from(lotto.lottoNumbers).join(', ');

    lottoElement.append(lottoImage, lottoNumbers);
    return lottoElement;
  }
}
export default LottoView;
