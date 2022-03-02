import { VIEW_ACTION } from '../constants/actions';
import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/dom';
import LottoContainerView from './LottoContainerView';
import LottoResultView from './LottoResultView';

class LottoViewManager {
  #containerView = null;

  #resultView = null;

  constructor(emitEvent) {
    this.$app = findElement(SELECTOR.APP);
    this.#clear();
    this.#initializeViews(emitEvent);
  }

  work({ payload, action }) {
    const perform = this.#reducer[action];
    perform(payload);
  }

  #initializeViews(emitEvent) {
    this.#containerView = new LottoContainerView({ $app: this.$app, emitEvent });
    this.#resultView = new LottoResultView({ $app: this.$app, emitEvent });
  }

  #clear() {
    this.$app.innerHTML = '';
  }

  #reducer = {
    [`${VIEW_ACTION.UPDATE_LOTTO_LIST}`]: (payload) => {
      this.#containerView.renderLottoSection(payload);
      this.#resultView.showWinNumberInputSection();
    },
    [`${VIEW_ACTION.UPDATE_VISIBLE_STATE}`]: (payload) => {
      this.#containerView.renderAlignState(payload);
    },
    [`${VIEW_ACTION.RENDER_STATISTICS}`]: (payload) => {
      this.#resultView.showStatisticsModal();
      this.#resultView.renderStatisticsModalContents(payload);
    },
    [`${VIEW_ACTION.MODAL_CANCEL}`]: () => {
      this.#resultView.hideWinStatisticsModalContents();
    },
  };
}
export default LottoViewManager;
