const Validator = {
  validatePurchasePrice(input) {
    const purchasePrice = Number(input.trim());

    if (Number.isNaN(purchasePrice)) {
      throw new Error("[ERROR] 구입 금액이 숫자가 아닙니다!");
    }
    if (Number(purchasePrice) < 1000) {
      throw new Error("[ERROR] 구입 최소 금액은 1000원 입니다!");
    }

    return purchasePrice;
  },

  validateWinningNumbers(inputs) {
    const numbers = inputs.map((numStr) => Number(numStr));

    const winningNumbers = this.validateCommonNumbers(numbers);

    const isOutRange = winningNumbers.some((num) => num < 1 || num > 45);
    if (isOutRange) {
      throw new Error(`[ERROR] 당첨 번호는 1~45 범위여야 합니다!`);
    }

    return winningNumbers;
  },

  validateCommonNumbers(numbers) {
    const hasNaN = numbers.some((n) => Number.isNaN(n));
    if (hasNaN) {
      throw new Error("[ERROR] 각 번호가 숫자가 아닙니다!");
    }

    if (numbers.length !== 6) {
      throw new Error(`[ERROR] 번호는 6개여야 합니다!`);
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error("[ERROR] 중복된 숫자가 있습니다.");
    }

    return numbers;
  },

  validateBonusNumber(input, winningNumbers) {
    const bonusNumber = Number(input.trim());

    if (Number.isNaN(bonusNumber) || bonusNumber < 1 || bonusNumber > 45) {
      throw new Error("[ERROR] 보너스 번호는 1~45 범위의 숫자여야 합니다!");
    }
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호가 당첨번호와 중복됩니다!");
    }

    return bonusNumber;
  },

  validateRestart(input) {
    const command = input.trim().toLowerCase();

    if (command !== "y" && command !== "n") {
      throw new Error("[ERROR] y 또는 n을 입력해주세요!");
    }

    return command;
  },
};

export default Validator;
