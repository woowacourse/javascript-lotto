import { RENDER_VIEW_KEY } from '../constants/actionKey';
import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/dom';
import LottoContainerView from './LottoContainerView';
import LottoResultView from './LottoResultView';

class LottoViewManager {
  #containerView = null;

  #resultView = null;

  constructor({ eventHandlers }) {
    this.$app = findElement(SELECTOR.APP);
    this.clear();
    this.#initializeViews(eventHandlers);
  }

  #initializeViews({
    onSubmitChargeForm,
    onChangeAlignState,
    onSubmitResultForm,
    onClickRestartButton,
  }) {
    this.#containerView = new LottoContainerView({
      $app: this.$app,
      onSubmitChargeForm,
      onChangeAlignState,
    });
    this.#resultView = new LottoResultView({
      $app: this.$app,
      onSubmitResultForm,
      onClickRestartButton,
    });
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
      this.#resultView.renderStatisticsModal(newData);
    }
  }

  clear() {
    this.$app.innerHTML = '';
  }
}
export default LottoViewManager;
