import {
  CLASSNAMES,
  DISABLED_PURCHASE_BUTTON_TEXT,
  LOTTO_IMAGE,
  SELECTOR,
} from '../constants/constants';
import { div, label, p } from '../utils/createElement';
import { selectDom } from '../utils/utils';

class PurchasedLottoView {
  constructor() {
    this.purchasedLottoSection = selectDom(SELECTOR.PURCHASED_LOTTO_SECTION_CLASS);
    this.showNumberToggleButton = selectDom(SELECTOR.SHOW_NUMBER_TOGGLE_BUTTON_CLASS);
    this.showNumberToggleButton.addEventListener('click', this.#toggleLottoNumbersShow);
    this.lottoContainer = selectDom(SELECTOR.LOTTO_CONTAINER_CLASS, this.purchasedLottoSection);
    this.lottoGrid = selectDom(SELECTOR.LOTTO_GRID_CLASS, this.lottoContainer);
  }

  #toggleLottoNumbersShow = ({ target: { checked: isVisible } }) => {
    this.lottoGrid.className = `lotto-grid${!isVisible && ' hide-numbers'}`;
  };

  #disableCashInput() {
    const cashInput = selectDom(SELECTOR.CASH_INPUT_CLASS, this.cashInputSection);
    const cashInputButton = selectDom(SELECTOR.CASH_INPUT_BUTTON_CLASS, this.cashInputSection);
    cashInput.disabled = true;
    cashInputButton.disabled = true;
    cashInputButton.textContent = DISABLED_PURCHASE_BUTTON_TEXT;
  }

  renderLottos(lottos) {
    this.#disableCashInput();
    this.purchasedLottoSection.classList.remove(CLASSNAMES.HIDE_CLASSNAME);

    this.lottoContainer.prepend(this.#generatePurchasedLabel(lottos.length));
    this.lottoGrid.append(...this.#generateLottoElementsArray(lottos));
  }

  #generatePurchasedLabel(length) {
    return label({ children: `총 ${length}개를 구매하였습니다.` });
  }

  #generateLottoElementsArray(lottos) {
    return lottos.map((lottoNumberSet) => this.#generateLottoElement(lottoNumberSet));
  }

  #generateLottoElement(lottoNumberSet) {
    return div({
      className: CLASSNAMES.LOTTO_CLASSNAME,
      children: [
        p({ className: CLASSNAMES.LOTTO_IMAGE_CLASSNAME, children: LOTTO_IMAGE }),
        p({
          className: CLASSNAMES.LOTTO_NUMBERS_CLASSNAME,
          children: Array.from(lottoNumberSet).join(', '),
        }),
      ],
    });
  }
}

export default PurchasedLottoView;
