import { DISABLED_PURCHASE_BUTTON_TEXT, LOTTO_IMAGE, SELECTOR } from '../constants/constants';
import { createElementWithClassName, selectDom } from '../utils/utils';

class LottoView {
  constructor() {
    this.cashInputButton = selectDom(SELECTOR.CASH_INPUT_BUTTON_CLASS);
    this.cashInput = selectDom(SELECTOR.CASH_INPUT_CLASS);

    this.purchasedLottoSection = selectDom(SELECTOR.PURCHASED_LOTTO_SECTION_CLASS);
    this.lottoShowContainer = selectDom(SELECTOR.LOTTO_SHOW_CONTAINER_CLASS);
    this.lottoNumberContainer = selectDom(
      SELECTOR.LOTTO_NUMBER_CONTAINER_CLASS,
      this.purchasedLottoSection
    );
    this.showNumberToggleButton = selectDom(SELECTOR.SHOW_NUMBER_TOGGLE_BUTTON_CLASS);

    this.winnerNumberSection = selectDom(SELECTOR.WINNER_NUMBER_SECTION_CLASS);
  }

  toggleLottoNumbersShow(isVisible) {
    const { classList: lottoNumberClassList } = this.lottoNumberContainer;
    if (isVisible) {
      lottoNumberClassList.add(SELECTOR.ONE_COLUMN_GRID_CLASSNAME);
      lottoNumberClassList.remove(SELECTOR.HIDE_NUMBERS_CLASSNAME);
      return;
    }
    lottoNumberClassList.remove(SELECTOR.ONE_COLUMN_GRID_CLASSNAME);
    lottoNumberClassList.add(SELECTOR.HIDE_NUMBERS_CLASSNAME);
  }

  disableCashInputSection() {
    this.cashInput.disabled = true;
    this.cashInputButton.disabled = true;
    this.cashInputButton.textContent = DISABLED_PURCHASE_BUTTON_TEXT;
  }

  renderLottos(lottos) {
    this.purchasedLottoSection.classList.remove(SELECTOR.HIDE_CLASSNAME);
    this.winnerNumberSection.classList.remove(SELECTOR.HIDE_CLASSNAME);

    this.lottoShowContainer.prepend(this.#generatePurchasedLabel(lottos.length));
    this.lottoNumberContainer.append(...this.#generateLottoElementsArray(lottos));
  }

  #generatePurchasedLabel(length) {
    const labelElement = document.createElement('label');
    labelElement.textContent = `총 ${length}개를 구매하였습니다.`;
    return labelElement;
  }

  #generateLottoElementsArray(lottos) {
    return lottos.map((lotto) => this.#generateLottoElement(lotto));
  }

  #generateLottoElement(lotto) {
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
