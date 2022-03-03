import { SELECTOR } from './constants/selector';
import LottoViewManager from './views';
import LottoDomainManager from './domains';
import { DOMAIN_ACTION, VIEW_ACTION } from './constants/actions';
import { isCancelModal } from './utils/dom';
import { setListener } from './utils/event';
import { EVENT } from './constants/events';

class LottoGameManager {
  #lottoDomainManager = null;

  #lottoViewManager = null;

  start() {
    this.#setEventHandler();
    this.#initializeManagers();
  }

  #initializeManagers(emitEvent) {
    this.#lottoDomainManager = new LottoDomainManager();
    this.#lottoViewManager = new LottoViewManager(emitEvent);
  }

  #setEventHandler() {
    setListener(EVENT.SUBMIT_CHARGE, this.onSubmitCharge);
    setListener(EVENT.CHANGE_ALIGN_STATE, this.onChangeAlignState);
    setListener(EVENT.SUBMIT_RESULT, this.onSubmitResult);
    setListener(EVENT.CLICK_RESTART_BUTTON, this.onClickRestartButton);
    setListener(EVENT.CLICK_MODAL, this.onClickModal);
    setListener(EVENT.INPUT_OVER_MAX_LENGTH, this.onInputOverMaxLength);
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
      payload: lottoList.map((lotto) => lotto.getLottoNumbers()),
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

  onInputOverMaxLength = (e) => {
    const { target: inputElement } = e;

    const { value, maxLength } = inputElement;

    /** 인풋 글자 수 제한. */
    if (value.length > maxLength) {
      inputElement.value = value.slice(0, maxLength);
    }
    /** 다음 자식으로 포커스 넘어감 */
    if (value.length === maxLength) {
      inputElement.nextElementSibling?.focus();
    }
  };
}
export default LottoGameManager;
