import { SELECTOR } from './constants/selector';
import LottoViewManager from './views';
import LottoDomainManager from './domains';
import { DOMAIN_ACTION, VIEW_ACTION } from './constants/actions';
import { isCancelModal } from './utils/dom';
import { bindEvent } from './utils/event';
import { EVENT } from './constants/events';

class LottoGameManager {
  #lottoDomainManager = null;

  #lottoViewManager = null;

  start() {
    this.#bindEventHandler();
    this.#initializeManagers();
  }

  #initializeManagers(emitEvent) {
    this.#lottoDomainManager = new LottoDomainManager();
    this.#lottoViewManager = new LottoViewManager(emitEvent);
  }

  #bindEventHandler() {
    bindEvent(EVENT.SUBMIT_CHARGE, this.onSubmitCharge);
    bindEvent(EVENT.CHANGE_ALIGN_STATE, this.onChangeAlignState);
    bindEvent(EVENT.SUBMIT_RESULT, this.onSubmitResult);
    bindEvent(EVENT.CLICK_RESTART_BUTTON, this.onClickRestartButton);
    bindEvent(EVENT.CLICK_MODAL, this.onClickModal);
  }

  onSubmitCharge = (e) => {
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
    const lottoList = this.#lottoDomainManager.work({
      payload: chargeInput,
      action: DOMAIN_ACTION.NEW_CHARGE_INPUT,
    });

    this.#lottoViewManager.work({
      payload: lottoList,
      action: VIEW_ACTION.UPDATE_LOTTO_LIST,
    });
  }

  onChangeAlignState = (e) => {
    const { checked: alignState } = e.target;
    this.#lottoViewManager.work({
      payload: alignState,
      action: VIEW_ACTION.UPDATE_VISIBLE_STATE,
    });
  };

  onSubmitResult = (e) => {
    e.preventDefault();
    const winningNumberInputNodes = [...e.target.querySelectorAll(SELECTOR.WINNING_NUMBER_INPUT)];
    const { value: bonusNumberInput } = e.target.querySelector(SELECTOR.BONUS_NUMBER_INPUT);

    const winningNumbers = winningNumberInputNodes.map(({ value }) => Number(value));
    const bonusNumber = Number(bonusNumberInput);

    this.triggerWinningNumberAction(winningNumbers, bonusNumber);
  };

  triggerWinningNumberAction(winningNumbers, bonusNumber) {
    try {
      const { statistics, profitRatio } = this.#lottoDomainManager.work({
        payload: { winningNumbers, bonusNumber },
        action: DOMAIN_ACTION.COMPUTE_RESULT_STATISTICS,
      });

      this.#lottoViewManager.work({
        payload: { statistics, profitRatio },
        action: VIEW_ACTION.RENDER_STATISTICS,
      });
    } catch ({ message }) {
      alert(message);
    }
  }

  onClickModal = ({ target: { className } }) => {
    if (isCancelModal(className)) {
      this.#lottoViewManager.work({
        action: VIEW_ACTION.MODAL_CANCEL,
      });
    }
  };

  onClickRestartButton = () => {
    this.start();
  };
}
export default LottoGameManager;
