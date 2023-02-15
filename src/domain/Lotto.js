import { deduplicateArray } from '../utils/Utils';
import {
  LOTTO_LENGTH,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../data/Constants';
class Lotto {
  #lottoNumber;
  #winRank;

  constructor() {
    this.#lottoNumber = deduplicateArray(LOTTO_LENGTH, [
      MIN_LOTTO_NUMBER,
      MAX_LOTTO_NUMBER,
    ]);

    this.#winRank = null;
  }

  get lottoNumber() {
    return this.#lottoNumber;
  }
}

export default Lotto;
