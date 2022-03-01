import { VIEW_ACTION } from '../constants/actions';
import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/dom';
import LottoContainerView from './LottoContainerView';
import LottoResultView from './LottoResultView';

class LottoViewManager {
  #containerView = null;

  #resultView = null;

  constructor() {
    this.$app = findElement(SELECTOR.APP);
    this.#clear();
    this.#initializeViews();
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
    if (action === VIEW_ACTION.BIND_EVENT_HANDLER) {
      this.#bindEventHandlers(payload);
    }
    if (action === VIEW_ACTION.MODAL_CANCEL) {
      this.#resultView.hideWinStatisticsModal();
    }
  }

  #initializeViews() {
    this.#containerView = new LottoContainerView({ $app: this.$app });
    this.#resultView = new LottoResultView({ $app: this.$app });
  }

  #clear() {
    this.$app.innerHTML = '';
  }

  #bindEventHandlers({
    onSubmitChargeForm,
    onChangeAlignState,
    onSubmitResultForm,
    onClickRestartButton,
    onClickModal,
  }) {
    this.#containerView.bindEventHandler({ onSubmitChargeForm, onChangeAlignState });
    this.#resultView.bindEventHandler({
      onSubmitResultForm,
      onClickRestartButton,
      onClickModal,
    });
  }
}
export default LottoViewManager;
