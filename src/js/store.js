export default class Store {
  constructor() {
    this.data = {
      lottos: [],
      winningNumbers: [{ numbers: [1, 2, 3, 4, 5, 6], bonus: 10 }],
    };
  }

  init() {}

  save(key, data) {
    this.data = {
      ...this.data,
      [key]: data,
    };
  }

  load(key) {
    return this.data[key];
  }
}
