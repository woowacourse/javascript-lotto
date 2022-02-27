import { DISABLED_PURCHASE_BUTTON_TEXT, LOTTO_IMAGE, CLASSNAME } from '../constants/constants';
import { createElementWithClassName, selectDom } from '../utils/utils';

class LottoMachineView {
  constructor() {
    this.cashInputButton = selectDom('.cash-input-button');
    this.cashInput = selectDom('.cash-input');

    this.purchasedLottoSection = selectDom('.purchased-lotto-section');
    this.lottoShowContainer = selectDom('.lotto-container', this.purchasedLottoSection);
    this.lottoNumberContainer = selectDom('.lotto-grid', this.purchasedLottoSection);
    this.showNumberToggleButton = selectDom(
      '.show-number-toggle-button',
      this.purchasedLottoSection
    );

    this.winnerNumberSection = selectDom('.winner-number-section');
  }

  toggleLottoNumbersShow(isVisible) {
    const { classList: lottoNumberClassList } = this.lottoNumberContainer;
    if (isVisible) {
      lottoNumberClassList.remove(CLASSNAME.HIDE_NUMBERS);
      return;
    }
    lottoNumberClassList.add(CLASSNAME.HIDE_NUMBERS);
  }

  disableCashInputSection() {
    this.cashInput.disabled = true;
    this.cashInputButton.disabled = true;
    this.cashInputButton.textContent = DISABLED_PURCHASE_BUTTON_TEXT;
  }

  renderLottos(lottos) {
    this.purchasedLottoSection.classList.remove(CLASSNAME.HIDE);
    this.winnerNumberSection.classList.remove(CLASSNAME.HIDE);

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
    const lottoElement = createElementWithClassName('div', CLASSNAME.LOTTO);

    const lottoImage = createElementWithClassName('p', CLASSNAME.LOTTO_IMAGE);
    lottoImage.textContent = LOTTO_IMAGE;

    const lottoNumbers = createElementWithClassName('p', CLASSNAME.LOTTO_NUMBERS);
    lottoNumbers.textContent = Array.from(lotto.lottoNumberSet).join(', ');

    lottoElement.append(lottoImage, lottoNumbers);
    return lottoElement;
  }
}

export default LottoMachineView;
