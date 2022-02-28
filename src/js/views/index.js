import { RENDER_VIEW_KEY } from '../constants/actionKey';
import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/dom';
import LottoContainerView from './LottoContainerView';
import LottoResultView from './LottoResultView';

class LottoViewManager {
  #containerView = null;

  #resultView = null;

  constructor({ eventHandlers }) {
    this.#initializeViews(eventHandlers);
    this.#initializeDOM();
  }

  #initializeViews({
    onSubmitChargeForm,
    onChangeAlignState,
    onSubmitResultForm,
    onClickRestartButton,
  }) {
    const $app = findElement(SELECTOR.APP);
    this.#containerView = new LottoContainerView({ $app, onSubmitChargeForm, onChangeAlignState });
    this.#resultView = new LottoResultView({ $app, onSubmitResultForm, onClickRestartButton });
  }

  #initializeDOM() {
    this.$purchasedMessage = findElement(SELECTOR.PURCHASED_MESSAGE);
    this.$lottoContainer = findElement(SELECTOR.LOTTO_CONTAINER);
  }

  renderView({ newData, actionKey }) {
    if (actionKey === RENDER_VIEW_KEY.UPDATE_LOTTO_LIST) {
      this.#containerView.renderLottoSection(newData);
      this.#resultView.showWinNumberInputSection();
    }
    if (actionKey === RENDER_VIEW_KEY.UPDATE_VISIBLE_STATE) {
      this.#containerView.renderAlignState(newData);
    }
    if (actionKey === RENDER_VIEW_KEY.RENDER_STATISTICS) {
      console.log(newData);
    }
  }
}
export default LottoViewManager;
