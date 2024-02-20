class Lotto {
  numberList;

  constructor(numberList) {
    numberList.sort((a, b) => a - b);
    this.numberList = numberList;
  }
}

export default Lotto;
