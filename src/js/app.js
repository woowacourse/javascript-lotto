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
    const winningNumberInputNodes = [...e.target.querySelectorAll(SELECTOR.WINNING_NUMBER_INPUT)];
    const { value: bonusNumberInput } = e.target.querySelector(SELECTOR.BONUS_NUMBER_INPUT);

    const winningNumbers = winningNumberInputNodes.map(({ value }) => Number(value));
    const bonusNumber = Number(bonusNumberInput);

    this.triggerWinningNumberAction(winningNumbers, bonusNumber);
  };

  triggerWinningNumberAction(winningNumbers, bonusNumber) {
    try {
      const { statistics, profitRatio } = this.#lottoDomainManager.mutateDomainState({
        newData: { winningNumbers, bonusNumber },
        actionKey: MUTATE_DOMAIN_KEY.COMPUTE_RESULT_STATISTICS,
      });
      this.#lottoViewManager.renderView({
        newData: { statistics, profitRatio },
        actionKey: RENDER_VIEW_KEY.RENDER_STATISTICS,
      });
    } catch ({ message }) {
      alert(message);
    }
  }

  onClickRestartButton = () => {
    this.start();
  };

  start() {
    this.#initializeManagers();
  }
}
export default LottoGameManager;
