import LottoNumbers from './LottoNumbers.js';

export default class Lotto {
  constructor() {
    this.numbers = new LottoNumbers();
  }

  getNumbers() {
    return this.numbers.list;
  }
}
