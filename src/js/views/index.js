import { VIEW_ACTION } from '../constants/actions';
import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/dom';
import LottoContainerView from './LottoContainerView';
import LottoResultView from './LottoResultView';

class LottoViewManager {
  #containerView = null;

  #resultView = null;

  constructor({ eventHandlers }) {
    this.$app = findElement(SELECTOR.APP);
    this.#clear();
    this.#initializeViews(eventHandlers);
  }

  work({ payload, action }) {
    if (action === VIEW_ACTION.UPDATE_LOTTO_LIST) {
      this.#containerView.renderLottoSection(payload);
      this.#resultView.showWinNumberInputSection();
    }
    if (action === VIEW_ACTION.UPDATE_VISIBLE_STATE) {
      this.#containerView.renderAlignState(payload);
    }
    if (action === VIEW_ACTION.RENDER_STATISTICS) {
      this.#resultView.renderStatisticsModal(payload);
    }
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

  #clear() {
    this.$app.innerHTML = '';
  }
}
export default LottoViewManager;
