const Validator = {
  validatePurchasePrice(purchasePrice) {
    const trimmedPrice = purchasePrice.trim();

    if (isNaN(trimmedPrice)) {
      throw new Error("[ERROR] 구입 금액이 숫자가 아닙니다!");
    }
    if (Number(trimmedPrice) < 1000) {
      throw new Error("[ERROR] 구입 최소 금액은 1000원 입니다!");
    }

    return trimmedPrice;
  },

  validateWinningNumbers(input) {
    if (!input.includes(","))
      throw new Error("[ERROR] 쉼표를 기준으로 구분하지 않았습니다!");

    const nums = input
      .split(",")
      .map((numStr) => Number(numStr.trim()));

    const winningNumbers = this.validateCommonNumbers(nums);

    const isOutRange = winningNumbers.some((num) => num < 1 || num > 45);
    if (isOutRange) {
      throw new Error(`[ERROR] 당첨 번호는 1~45 범위여야 합니다!`);
    }

    return winningNumbers;
  },

  validateCommonNumbers(nums) {
    const hasNaN = nums.some((n) => Number.isNaN(n));
    if (hasNaN) {
      throw new Error("[ERROR] 각 번호가 숫자가 아닙니다!");
    }

    if (nums.length !== 6) {
      throw new Error(`[ERROR] 번호는 6개여야 합니다!`);
    }

    if (new Set(nums).size !== nums.length) {
      throw new Error("[ERROR] 중복된 숫자가 있습니다.");
    }

    return nums;
  },

  validateBonusNumber(bonusNumber, winningNumbers) {
    const bonus = Number(bonusNumber.trim());

    if (Number.isNaN(bonus) || bonus < 1 || bonus > 45) {
      throw new Error("[ERROR] 보너스 번호는 1~45 범위의 숫자여야 합니다!");
    }
    if (winningNumbers.includes(bonus)) {
      throw new Error("[ERROR] 보너스 번호가 당첨번호와 중복됩니다!");
    }

    return bonus;
  }
};

export default Validator;
