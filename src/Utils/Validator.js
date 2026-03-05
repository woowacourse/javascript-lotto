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

    const winningNumbers = input
      .split(",")
      .map((numStr) => Number(numStr.trim()));

    const hasNaN = winningNumbers.some((n) => Number.isNaN(n));
    if (hasNaN) {
      throw new Error("[ERROR] 각 번호가 숫자가 아닙니다!");
    }

    if (winningNumbers.length !== 6) {
      throw new Error(`[ERROR] 당첨 번호는 6개여야 합니다!`);
    }

    const isOutRange = winningNumbers.some((num) => num < 1 || num > 45);
    if (isOutRange) {
      throw new Error(`[ERROR] 당첨 번호는 1~45 범위여야 합니다!`);
    }

    return winningNumbers;
  },
};

export default Validator;
