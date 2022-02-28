import { MUTATE_DOMAIN_KEY } from '../constants/actionKey';
import LottoList from './LottoList';

class LottoDomainManager {
  #lottoListDomain = null;

  constructor() {
    this.#initializeDomain();
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

  mutateDomainState({ newData, actionKey }) {
    if (actionKey === MUTATE_DOMAIN_KEY.NEW_CHARGE_INPUT) {
      return this.#performActionNewChargeInput(newData);
    }
    if (actionKey === MUTATE_DOMAIN_KEY.COMPUTE_RESULT_STATISTICS) {
      return this.#performActionComputeResultStatistics(newData);
    }
  }
}

export default LottoDomainManager;
