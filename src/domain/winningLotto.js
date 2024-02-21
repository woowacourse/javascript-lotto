import { LOTTO_RULES } from '../constant/index.js';

export default class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;

    if (bonusNumber < LOTTO_RULES.min_number || bonusNumber > LOTTO_RULES.max_number) {
      throw new Error('보너스 번호는 1부터 45 사이여야합니다.');
    }

    this.#bonusNumber = bonusNumber;
  }
}
