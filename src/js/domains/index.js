import { DOMAIN_ACTION } from '../constants/actions';
import LottoList from './LottoList';

class LottoDomainManager {
  #lottoListDomain = null;

  constructor() {
    this.#initializeDomain();
  }

  work({ payload, action }) {
    const perform = this.#reducer[action];

    const newDomainState = perform(payload);

    return newDomainState;
  }

  #initializeDomain() {
    this.#lottoListDomain = new LottoList();
  }

  #reducer = {
    [DOMAIN_ACTION.NEW_CHARGE_INPUT]: (chargeInput) => {
      this.#lottoListDomain.createLottoList(chargeInput);
      return this.#lottoListDomain.getLottoList();
    },
    [DOMAIN_ACTION.COMPUTE_RESULT_STATISTICS]: ({ winningNumbers, bonusNumber }) => {
      const result = this.#lottoListDomain.computeStatisticsAndProfitRatio(
        winningNumbers,
        bonusNumber
      );
      return result;
    },
  };
}

export default LottoDomainManager;
