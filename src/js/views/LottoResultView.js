import { $ } from '../utils/element-manager';
import { makeLottoResultTemplate, makeLottoResultYieldText } from '../utils/Lotto/template-manager';

export default class LottoResultView {
  #container;
  #lottoResultList;
  #lottoResultYield;
  #lottoRetryButton;

  constructor(containerSelector) {
    this.#container = $(containerSelector);

    this.#defaultElements();
  }

  #defaultElements() {
    this.#lottoResultList = $(this.#container, '#lotto-result-list');
    this.#lottoResultYield = $(this.#container, '#lotto-yield-text');
    this.#lottoRetryButton = $(this.#container, '#lotto-retry-button');
  }

  renderLottoResultList(winningRankCountList) {
    this.#lottoResultList.innerHTML = makeLottoResultTemplate(winningRankCountList);
  }

  renderLottoResultYield(playerLottoYield) {
    this.#lottoResultYield.innerHTML = makeLottoResultYieldText(playerLottoYield);
  }

  bindLottoRetryButton(handler) {
    this.#lottoRetryButton.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  }
}
