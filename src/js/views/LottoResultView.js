import { SELECTOR } from '../constants/selector';
import { $ } from '../utils/element-manager';
import {
  makeLottoResultTemplate,
  makeLottoResultProfitRatioText,
} from '../utils/Lotto/template-manager';

export default class LottoResultView {
  #container;
  #lottoResultList;
  #lottoResultProfitRatio;
  #lottoRetryButton;

  constructor() {
    this.#container = $(SELECTOR.ID.LOTTO_RESULT_MODAL);

    this.#defaultElements();
    this.init();
  }

  #defaultElements() {
    this.#lottoResultList = $(this.#container, SELECTOR.ID.LOTTO_RESULT_LIST);
    this.#lottoResultProfitRatio = $(this.#container, SELECTOR.ID.LOTTO_PROFIT_RATIO_TEXT);
    this.#lottoRetryButton = $(this.#container, SELECTOR.ID.LOTTO_RETRY_BUTTON);
  }

  init() {
    this.#lottoResultList.innerHTML = '';
  }

  renderLottoResultList(winningRankCountList) {
    this.#lottoResultList.innerHTML = makeLottoResultTemplate(winningRankCountList);
  }

  renderLottoResultProfitRatio(playerLottoProfitRatio) {
    this.#lottoResultProfitRatio.innerHTML = makeLottoResultProfitRatioText(playerLottoProfitRatio);
  }

  bindLottoRetryButton(handler) {
    this.#lottoRetryButton.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  }
}
