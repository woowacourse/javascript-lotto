import LottoNumbers from './LottoNumbers';

export default class Lotto {
  constructor() {
    this.numbers = new LottoNumbers();
  }

  getNumbers() {
    return this.numbers.list;
  }
}
