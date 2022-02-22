export default class Lotto {
  constructor() {
    this.init();
  }

  init() {
    this.numberList = [];
  }

  getList() {
    return this.numberList;
  }

  setList(numberList) {
    this.numberList = numberList;
  }
}
