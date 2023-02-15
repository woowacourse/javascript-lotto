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
  }

  get lottoNumber() {
    return this.#lottoNumber;
  }

  get winRank() {
    return this.#winRank;
  }

  setRank(rank) {
    this.#winRank = rank;
  }
}

export default Lotto;
