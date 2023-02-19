const {
  ERROR,
  UNIT,
  LOTTO_SIZE,
  COMMAND,
  LOTTO_RANGE,
} = require("./constants");

const Validation = {
  purchaseAmount(amount) {
    this.inputIsInteger(amount);
    this.purchaseAmountIsOverUnit(amount);
    this.purchaseAmountDivideUnit(amount);
  },

  inputIsInteger(amount) {
    if (Number.isInteger(amount)) return;
    throw new Error(ERROR.NUMBER);
  },

  purchaseAmountIsOverUnit(amount) {
    if (amount >= UNIT) return;
    throw new Error(ERROR.OVER_UNIT(UNIT));
  },

  purchaseAmountDivideUnit(amount) {
    if (amount % UNIT === 0) return;
    throw new Error(ERROR.DIVIDE(UNIT));
  },

  lottoNumbers(numbers) {
    this.lottoNumberSize(numbers);
    this.isDuplicated(numbers);
    numbers.forEach((number) => {
      this.inputIsInteger(number);
      this.numberInRange(number);
    });
  },

  lottoNumberSize(numbers) {
    if (numbers.length === LOTTO_SIZE) return;
    throw new Error(ERROR.SIZE(LOTTO_SIZE));
  },

  isDuplicated(numbers) {
    const numbersSet = new Set(numbers);
    if (numbers.length === numbersSet.size) return;
    throw new Error(ERROR.DUPLICATED);
  },

  numberInRange(number) {
    if (number >= LOTTO_RANGE.MIN && number <= LOTTO_RANGE.MAX) return;
    throw new Error(ERROR.RANGE(LOTTO_RANGE.MIN, LOTTO_RANGE.MAX));
  },

  bonusNumber(lottoNumbers, bonusNumber) {
    this.inputIsInteger(bonusNumber);
    this.numberInRange(bonusNumber);
    this.isDuplicated([...lottoNumbers, bonusNumber]);
  },

  restartCommand(answer) {
    if (answer === COMMAND.RESTART || answer === COMMAND.QUIT) return;
    throw new Error(ERROR.RESTART);
  },
};

module.exports = Validation;
