import { SELECTOR } from './constants/selector';
import LottoViewManager from './views';
import LottoDomainManager from './domains';
import { MUTATE_DOMAIN_KEY, RENDER_VIEW_KEY } from './constants/actionKey';

class LottoGameManager {
  #lottoDomainManager = null;

  #lottoViewManager = null;

  #initializeManagers() {
    this.#lottoDomainManager = new LottoDomainManager();
    this.#lottoViewManager = new LottoViewManager({
      eventHandlers: {
        onSubmitChargeForm: this.onSubmitChargeForm,
        onChangeAlignState: this.onChangeAlignState,
        onSubmitResultForm: this.onSubmitResultForm,
        onClickRestartButton: this.onClickRestartButton,
      },
    });
  }

  onSubmitChargeForm = (e) => {
    e.preventDefault();
    try {
      const { value: chargeInputStr } = e.target.querySelector(SELECTOR.CHARGE_INPUT);
      const chargeInput = Number(chargeInputStr);
      this.triggerChargeInputAction(chargeInput);
    } catch ({ message }) {
      alert(message);
    }
  };

  triggerChargeInputAction(chargeInput) {
    const lottoList = this.#lottoDomainManager.mutateDomainState({
      newData: chargeInput,
      actionKey: MUTATE_DOMAIN_KEY.NEW_CHARGE_INPUT,
    });
    this.#lottoViewManager.renderView({
      newData: lottoList,
      actionKey: RENDER_VIEW_KEY.UPDATE_LOTTO_LIST,
    });
  }

  onChangeAlignState = (e) => {
    const { checked: alignState } = e.target;
    this.#lottoViewManager.renderView({
      newData: alignState,
      actionKey: RENDER_VIEW_KEY.UPDATE_VISIBLE_STATE,
    });
  };

  onSubmitResultForm = (e) => {
    e.preventDefault();
  };

  onClickRestartButton = () => {};

  start() {
    this.#initializeManagers();
  }
}
export default LottoGameManager;
