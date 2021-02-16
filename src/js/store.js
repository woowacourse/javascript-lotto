import LottoModel from './models/LottoModel';

export default class Store {
  constructor() {
    this.data = {
      lottos: [new LottoModel([6, 10, 25, 30, 34, 45])],
      winningNumbers: [{ numbers: [1, 2, 3, 4, 5, 6], bonus: 10 }],
    };
  }

  init() {}

  save() {}

  load(key) {
    return this.data[key];
  }
}
