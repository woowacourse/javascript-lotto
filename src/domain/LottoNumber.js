class LottoNumber {
  #number;
  static MIN = 1;
  static MAX = 45;

  constructor(number) {
    this.#validate(number);
    this.#number = number;
  }

  #validate(number) {
    if (isNaN(number)) throw new Error("[ERROR]");

    const isOutOfRange = number < LottoNumber.MIN || number > LottoNumber.MAX;

    if (isOutOfRange) throw new Error("[ERROR]");
  }

  get() {
    return this.#number;
  }
}

export default LottoNumber;
