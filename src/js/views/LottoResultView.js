import { SELECTOR } from '../constants/selector';
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
    this.init();
  }

  #defaultElements() {
    this.#lottoResultList = $(this.#container, SELECTOR.LOTTO_RESULT_LIST);
    this.#lottoResultYield = $(this.#container, SELECTOR.LOTTO_YIELD_TEXT);
    this.#lottoRetryButton = $(this.#container, SELECTOR.LOTTO_RETRY_BUTTON);
  }

  init() {
    this.#lottoResultList.innerHTML = '';
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
