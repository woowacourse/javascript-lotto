import { LOTTO_NUMBER, AMOUNT } from "../utils/constants.js";
import { shuffleArray } from "../utils/general.js";

export default class Lotto {
  #lottos = [];
  #lottoCount = 0;

  getLottoList() {
    return this.#lottos;
  }

  getLottoCount() {
    return this.#lottoCount;
  }

  convertLottoCount(purchaseAmount) {
    this.#lottoCount = Math.floor(purchaseAmount / AMOUNT.UNIT);
  }

  #generateLottoNumber() {
    const { LENGTH_MIN, LENGTH_MAX, RANGE_MIN, RANGE_MAX } = LOTTO_NUMBER;
    const lottoNumbers = [...Array(RANGE_MAX)].map((_, index) => index + RANGE_MIN);
    shuffleArray(lottoNumbers);
    return lottoNumbers.slice(LENGTH_MIN, LENGTH_MAX);
  }

  generateLottoTicket() {
    this.#lottos = [...Array(this.#lottoCount)].map(this.#generateLottoNumber);
  }
}
