import { ERROR, NUMBER, COMMAND } from "./constants.js";

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
    if (amount >= NUMBER.UNIT) return;
    throw new Error(ERROR.OVER_UNIT);
  },

  purchaseAmountDivideUnit(amount) {
    if (amount % NUMBER.UNIT === 0) return;
    throw new Error(ERROR.DIVIDE);
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
    if (numbers.length === NUMBER.SIZE) return;
    throw new Error(ERROR.SIZE);
  },

  isDuplicated(numbers) {
    const numbersSet = new Set(numbers);
    if (numbers.length === numbersSet.size) return;
    throw new Error(ERROR.DUPLICATED);
  },

  numberInRange(number) {
    if (number >= NUMBER.MIN_RANGE && number <= NUMBER.MAX_RANGE) return;
    throw new Error(ERROR.RANGE);
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

export default Validation;
