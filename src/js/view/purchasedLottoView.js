import { SELECTOR } from '../constants/constants';
import { div, label, p } from '../utils/createElement';
import { selectDom } from '../utils/utils';

class PurchasedLottoView {
  constructor() {
    this.purchasedLottoSection = selectDom(SELECTOR.PURCHASED_LOTTO_SECTION_CLASS);
    this.showNumberToggleButton = selectDom(SELECTOR.SHOW_NUMBER_TOGGLE_BUTTON_CLASS);
    this.showNumberToggleButton.addEventListener('click', this.#toggleLottoNumbersShow);
    this.lottoContainer = selectDom(SELECTOR.LOTTO_CONTAINER_CLASS, this.purchasedLottoSection);
    this.lottoGrid = selectDom(SELECTOR.LOTTO_GRID_CLASS, this.lottoContainer);
    this.totalAmountLabel = null;
  }

  renderLottos(lottoArray) {
    this.purchasedLottoSection.classList.remove('hide');

    this.totalAmountLabel = this.#generatePurchasedLabel(lottoArray.length);
    this.lottoContainer.prepend(this.totalAmountLabel);
    this.lottoGrid.append(...this.#generateLottoElementsArray(lottoArray));
  }

  resetView() {
    while (this.lottoGrid.firstChild) {
      this.lottoGrid.removeChild(this.lottoGrid.lastChild);
    }
    this.totalAmountLabel.remove();
    this.purchasedLottoSection.classList.add('hide');
    this.lottoGrid.className = 'lotto-grid hide-numbers';
  }

  #toggleLottoNumbersShow = ({ target: { checked: isVisible } }) => {
    this.lottoGrid.className = `lotto-grid${!isVisible && ' hide-numbers'}`;
  };

  #generatePurchasedLabel(length) {
    return label({ children: `총 ${length}개를 구매하였습니다.` });
  }

  #generateLottoElementsArray(lottos) {
    return lottos.map((lottoNumberSet) => this.#generateLottoElement(lottoNumberSet));
  }

  #generateLottoElement(lottoNumberSet) {
    return div({
      className: 'lotto',
      children: [
        p({ className: 'lotto-image', children: '🎟️' }),
        p({
          className: 'lotto-numbers',
          children: Array.from(lottoNumberSet).join(', '),
        }),
      ],
    });
  }
}

export default PurchasedLottoView;
