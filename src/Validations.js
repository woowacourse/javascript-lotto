const Validations = {
  isNumber(input) {
    return isNaN(input) ? false : true;
  },

  isDevidedByThousand(buyMoney) {
    return buyMoney % 1000 === 0;
  },

  isPositiveInteger(input) {
    return input > 0 && input % 1 === 0;
  },

  isCorrectRange(input) {
    return 0 < input && input < 46 ? true : false;
  },

  hasBonusNumber(bonusNumber, winningLotto) {
    return winningLotto.includes(String(bonusNumber))
  },

  isCorrectRetryInput(retryInput) {
    return retryInput === "y" || retryInput === "Y" || retryInput === "n" || retryInput === "N"
  },

  isCorrectLength(lottoNumbers) {
    return lottoNumbers.length === 6
  },

  isDuplicatedNumbers(randomNumbers) {
    return new Set(randomNumbers).size === randomNumbers.length
  }

};

export default Validations;
