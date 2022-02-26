import { LOTTO_NUMBER } from "../utils/constants.js";
import { shuffle } from "../utils/general.js";

export default class Lotto {
  constructor() {
    this.numbers = [];
  }

  generateRandomNumber() {
    const { LENGTH_MIN, LENGTH_MAX, RANGE_MIN, RANGE_MAX } = LOTTO_NUMBER;

    const lottoNumbers = Array(RANGE_MAX)
      .fill()
      .map((num, index) => index + RANGE_MIN);
    shuffle(lottoNumbers);
    this.numbers = lottoNumbers.slice(LENGTH_MIN, LENGTH_MAX);
  }
}
