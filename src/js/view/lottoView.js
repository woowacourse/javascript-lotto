import { DISABLED_PURCHASE_BUTTON_TEXT, LOTTO_IMAGE, SELECTOR } from '../constants/constants';
import { createElementWithClassName, selectDom } from '../utils/utils';

class LottoView {
  constructor() {
    this.app = selectDom(SELECTOR.APP_ID);

    this.cashInputSection = selectDom(SELECTOR.CASH_INPUT_SECTION_CLASS, this.app);

    this.purchasedLottoSection = selectDom(SELECTOR.PURCHASED_LOTTO_SECTION_CLASS, this.app);
    this.lottoContainer = selectDom(SELECTOR.LOTTO_CONTAINER_CLASS, this.purchasedLottoSection);
    this.lottoGrid = selectDom(SELECTOR.LOTTO_GRID_CLASS, this.lottoContainer);

    this.winnerNumberSection = selectDom(SELECTOR.WINNER_NUMBER_SECTION_CLASS, this.app);
  }

  toggleLottoNumbersShow(isVisible) {
    const { classList: lottoGridClassList } = this.lottoGrid;
    if (isVisible) {
      lottoGridClassList.add(SELECTOR.ONE_COLUMN_GRID_CLASSNAME);
      lottoGridClassList.remove(SELECTOR.HIDE_NUMBERS_CLASSNAME);
      return;
    }
    lottoGridClassList.remove(SELECTOR.ONE_COLUMN_GRID_CLASSNAME);
    lottoGridClassList.add(SELECTOR.HIDE_NUMBERS_CLASSNAME);
  }

  disableCashInput() {
    const cashInput = selectDom(SELECTOR.CASH_INPUT_CLASS, this.cashInputSection);
    const cashInputButton = selectDom(SELECTOR.CASH_INPUT_BUTTON_CLASS, this.cashInputSection);
    cashInput.disabled = true;
    cashInputButton.disabled = true;
    cashInputButton.textContent = DISABLED_PURCHASE_BUTTON_TEXT;
  }

  renderLottos(lottos) {
    this.purchasedLottoSection.classList.remove(SELECTOR.HIDE_CLASSNAME);
    this.winnerNumberSection.classList.remove(SELECTOR.HIDE_CLASSNAME);

    this.lottoContainer.prepend(LottoView.generatePurchasedLabel(lottos.length));
    this.lottoGrid.append(...LottoView.generateLottoElementsArray(lottos));
  }

  static generatePurchasedLabel(length) {
    const labelElement = document.createElement('label');
    labelElement.textContent = `총 ${length}개를 구매하였습니다.`;
    return labelElement;
  }

  static generateLottoElementsArray(lottos) {
    return lottos.map((lotto) => LottoView.generateLottoElement(lotto));
  }

  static generateLottoElement(lotto) {
    const lottoElement = createElementWithClassName('div', SELECTOR.LOTTO_CLASSNAME);

    const lottoImage = createElementWithClassName('p', SELECTOR.LOTTO_IMAGE_CLASSNAME);
    lottoImage.textContent = LOTTO_IMAGE;

    const lottoNumbers = createElementWithClassName('p', SELECTOR.LOTTO_NUMBERS_CLASSNAME);
    lottoNumbers.textContent = Array.from(lotto.lottoNumberSet).join(', ');

    lottoElement.append(lottoImage, lottoNumbers);
    return lottoElement;
  }
}
export default LottoView;
