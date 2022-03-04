import { $ } from '../utils/element-manager';
import { makeLottoResultTemplate, makeLottoResultYieldText } from '../utils/Lotto/template-manager';

export default class LottoResultView {
  #container;
  #lottoResultList;
  #lottoResultYield;

  constructor(containerSelector) {
    this.#container = $(containerSelector);

    this.#defaultElements();
    this.#bindViewEvents();
  }

  #defaultElements() {
    this.#lottoResultList = $(this.#container, '#lotto-result-list');
    this.#lottoResultYield = $(this.#container, '#lotto-yield-text');
  }

  #bindViewEvents() {}

  renderLottoResultList(winningRankCountList) {
    this.#lottoResultList.innerHTML = makeLottoResultTemplate(winningRankCountList);
  }

  renderLottoResultYield(playerLottoYield) {
    this.#lottoResultYield.innerHTML = makeLottoResultYieldText(playerLottoYield);
  }
}
