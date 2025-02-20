const Validator = {
  validatePurchaseMoney(purchaseMoney) {
    if (Number.isNaN(purchaseMoney))
      throw new Error("[ERROR] 구입 금액은 숫자로 입력해야 합니다.");

    if (!Number.isInteger(purchaseMoney))
      throw new Error("[ERROR] 구입 금액은 정수로 입력해야 합니다.");

    if (purchaseMoney <= 0)
      throw new Error("[ERROR] 구입 금액은 양수로 입력해야 합니다.");

    if (purchaseMoney % 1000 !== 0)
      throw new Error("[ERROR] 구입 금액은 1000원 단위로 입력해야 합니다.");
  },

  validateWinningNumbers(winningNumbers) {
    winningNumbers.forEach((winningNumber) => {
      if (Number.isNaN(winningNumber))
        throw new Error("[ERROR] 당첨번호는 숫자로 입력해야 합니다.");

      if (!Number.isInteger(winningNumber))
        throw new Error("[ERROR] 당첨번호는 정수로 입력해야 합니다.");

      if (winningNumber < 1 || winningNumber > 45)
        throw new Error(
          "[ERROR] 당첨번호는 1 ~ 45 사이의 숫자로 입력해야 합니다."
        );
    });
    if (new Set(winningNumbers).size !== winningNumbers.length) {
      throw new Error("[ERROR] 당첨번호는 중복없이 입력해야 합니다.");
    }

    if (winningNumbers.length !== 6)
      throw new Error("[ERROR] 당첨번호는 6개를 입력해야 합니다.");
  },

  validateBonusNumber(winningNumbers, bonusNumber) {
    if (Number.isNaN(bonusNumber))
      throw new Error("[ERROR] 보너스번호는 숫자로 입력해야 합니다.");

    if (!Number.isInteger(bonusNumber))
      throw new Error("[ERROR] 보너스번호는 정수로 입력해야 합니다.");

    if (bonusNumber < 1 || bonusNumber > 45)
      throw new Error(
        "[ERROR] 보너스번호는 1 ~ 45 사이의 숫자로 입력해야 합니다."
      );
    if (winningNumbers.includes(bonusNumber))
      throw new Error(
        "[ERROR] 보너스번호는 당첨번호와 중복없이 입력해야 합니다."
      );
  },

  validateRestartRequest(input) {
    if (!(input === "y" || input === "n"))
      throw new Error("[ERROR] 재시작 여부는 y or n으로 입력해야 합니다.");
  },
};

export default Validator;
