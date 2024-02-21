class LottoNumber {
  static MIN = 1;
  static MAX = 45;

  constructor(number) {
    this.#validate(number);
  }

  #validate(number) {
    if (isNaN(number)) throw new Error("[ERROR]");

    const isOutOfRange = number < LottoNumber.MIN || number > LottoNumber.MAX;

    if (isOutOfRange) throw new Error("[ERROR]");
  }
}

export default LottoNumber;
