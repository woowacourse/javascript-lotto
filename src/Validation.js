const Validation = {
  purchaseAmount(amount) {
    this.inputIsInteger(amount);
    this.purchaseAmountIsOverUnit(amount);
    this.purchaseAmountDivideUnit(amount);
  },

  inputIsInteger(amount) {
    if (Number.isInteger(amount)) return;
    throw new Error("에러메세지");
  },

  purchaseAmountIsOverUnit(amount) {
    if (amount >= 1000) return;
    throw new Error("under unit");
  },

  purchaseAmountDivideUnit(amount) {
    if (amount % 1000 === 0) return;
    throw new Error(" unitX");
  },

  lottoNumbers(numbers) {
    this.isDuplicated(numbers);
    numbers.forEach((number) => {
      this.inputIsInteger(number);
      this.numberInRange(number);
    });
  },

  isDuplicated(numbers) {
    const numbersSet = new Set(numbers);
    if (numbers.length === numbersSet.size) return;
    throw new Error("duplicated");
  },

  numberInRange(number) {
    if (number >= 1 && number <= 45) return;
    throw new Error("not in range");
  },

  bonusNumber(lottoNumbers, bonusNumber) {
    this.inputIsInteger(bonusNumber);
    this.numberInRange(bonusNumber);
    this.isDuplicated([...lottoNumbers, bonusNumber]);
  },

  restartCommand(answer) {
    if (answer === "y" || answer === "n") return;
    throw new Error("yn");
  },
};

module.exports = Validation;
