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
    this.lottoNumbersIsDuplicated(numbers);
    numbers.forEach((number) => {
      this.inputIsInteger(number);
      this.numberInRange(number);
    });
  },

  lottoNumbersIsDuplicated(numbers) {
    const numbersSet = new Set(numbers);
    if (numbers.length === numbersSet.size) return;
    throw new Error("duplicated");
  },

  numberInRange(number) {
    if (number >= 1 && number <= 45) return;
    throw new Error("not in range");
  },

  restartCommand(answer) {
    if (answer === "y" || answer === "n") return;
    throw new Error("yn");
  },
};

module.exports = Validation;
