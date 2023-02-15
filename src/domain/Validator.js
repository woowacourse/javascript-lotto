const Validator = {
  purchaseAmount(money) {
    this.number(money);

    if (this.isLessThanMinimum(money)) {
      throw new Error();
    }
    if (this.hasChange(money)) {
      throw new Error();
    }
  },

  isLessThanMinimum(money) {
    return money < 1_000;
  },

  hasChange(money) {
    return money % 1_000 !== 0;
  },

  winningNumber(numbers) {
    const winningNumbers = numbers.split(',');

    winningNumbers.forEach((number) => {
      this.number(number);

      if (this.isOutOfRange(number)) {
        throw new Error();
      }
    });

    if (!this.isValidLength(winningNumbers)) {
      throw new Error();
    }
    if (this.hasDuplicatedNumber(winningNumbers)) {
      throw new Error();
    }
  },

  bonusNumber(bonusNumber, winningNumber) {
    this.number(bonusNumber);

    if (this.isOutOfRange(bonusNumber)) {
      throw new Error();
    }
    if (this.isDuplicatedNumber(bonusNumber, winningNumber)) {
      throw new Error();
    }
  },

  isDuplicatedNumber(bonusNumber, winningNumber) {
    return winningNumber.includes(bonusNumber);
  },

  restartCommand(command) {
    if (!this.isValidRestartCommand(command)) {
      throw new Error();
    }
  },

  isValidRestartCommand(command) {
    return command === 'y' || command === 'n';
  },

  isOutOfRange(number) {
    return number < 1 || number > 45;
  },

  hasDuplicatedNumber(numbers) {
    return numbers.length !== new Set(numbers).size;
  },

  isValidLength(numbers) {
    return numbers.length === 6;
  },

  number(number) {
    if (this.isNull(number)) {
      throw new Error();
    }
    if (this.hasBlank(number)) {
      throw new Error();
    }
    if (!this.isNumber(number)) {
      throw new Error();
    }
  },

  isNull(input) {
    return input === '';
  },

  hasBlank(input) {
    return input.includes(' ');
  },

  isNumber(input) {
    return isNaN(input);
  },
};

module.exports = Validator;
