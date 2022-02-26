import { LOTTO_NUMBER } from "../utils/constants.js";
import { shuffleArray } from "../utils/general.js";

export default class Lotto {
  constructor() {
    this.lottos = [];
  }

  getLottoList() {
    return this.lottos;
  }

  getLottoCount() {
    return this.lottos.length;
  }

  generateLottoNumber() {
    const { LENGTH_MIN, LENGTH_MAX, RANGE_MIN, RANGE_MAX } = LOTTO_NUMBER;
    const lottoNumbers = [...Array(RANGE_MAX)].map((_, index) => index + RANGE_MIN);
    shuffleArray(lottoNumbers);
    const selectedNumbers = lottoNumbers.slice(LENGTH_MIN, LENGTH_MAX);
    return selectedNumbers;
  }

  generateLottoTicket(count) {
    this.lottos = [...Array(count)].map(() => this.generateLottoNumber());
  }
}
