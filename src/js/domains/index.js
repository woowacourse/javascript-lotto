import { MUTATE_DOMAIN_KEY } from '../constants/actionKey';
import LottoList from './LottoList';

class LottoDomainManager {
  #lottoListDomain = null;

  constructor() {
    this.#initializeDomain();
  }

  mutateDomainState({ newData, actionKey }) {
    if (actionKey === MUTATE_DOMAIN_KEY.NEW_CHARGE_INPUT) {
      return this.#performActionNewChargeInput(newData);
    }
  }

  #performActionNewChargeInput(newData) {
    this.#lottoListDomain.createLottoList(newData);
    return this.#lottoListDomain.getLottoList();
  }

  #initializeDomain() {
    this.#lottoListDomain = new LottoList();
  }
}

export default LottoDomainManager;
