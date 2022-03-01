import { DOMAIN_ACTION } from '../constants/actions';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import LottoList from './LottoList';

class LottoDomainManager {
  #lottoListDomain = null;

  constructor() {
    this.#initializeDomain();
  }

  work({ payload, action }) {
    if (action === DOMAIN_ACTION.NEW_CHARGE_INPUT) {
      return this.#performActionNewChargeInput(payload);
    }
    if (action === DOMAIN_ACTION.COMPUTE_RESULT_STATISTICS) {
      return this.#performActionComputeResultStatistics(payload);
    }
    throw new Error(ERROR_MESSAGE.DOMAIN_MANAGER_WORK_ERROR);
  }

  #performActionNewChargeInput(chargeInput) {
    this.#lottoListDomain.createLottoList(chargeInput);
    return this.#lottoListDomain.getLottoList();
  }

  #performActionComputeResultStatistics({ winningNumbers, bonusNumber }) {
    return this.#lottoListDomain.computeWinResultStatistics(winningNumbers, bonusNumber);
  }

  #initializeDomain() {
    this.#lottoListDomain = new LottoList();
  }
}

export default LottoDomainManager;
