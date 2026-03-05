import { checkNumberRange } from "../utils/checkNumberRange.js";

export const Validator = {
  validatePurchaseMoney(money) {
    if (money < 1000) {
      throw new Error("[ERROR] 구입 금액은 1000원 이상입니다.");
    }
    if (isNaN(money)) {
      throw new Error("[ERROR] 구입 금액은 숫자만 입력해야 합니다.");
    }
    if (money % 1000 !== 0) {
      throw new Error("[ERROR] 구입 금액은 1000원 단위입니다.");
    }
  },

  validateWinningNumber(winningNumber) {
    const winningNumberArray = winningNumber.split(",");
    const regex = /^[0-9,]+$/;

    if (winningNumberArray.length !== 6) {
      throw new Error("[ERROR] 당첨 번호는 6개이어야 합니다.");
    }
    if (winningNumber.includes(",,")) {
      throw new Error("[ERROR] 콤마(,) 사이에 숫자를 입력해야 합니다.");
    }
    if (checkNumberRange(winningNumberArray).includes(false)) {
      throw new Error("[ERROR] 당첨 번호는 1 ~ 45 사이어야 합니다.");
    }
    if (!regex.test(winningNumber)) {
      throw new Error("[ERROR] 당첨 번호 구분은 콤마(,) 입니다.");
    }

    const set = new Set(winningNumberArray);
    if (set.size < 6) {
      throw new Error("[ERROR] 당첨 번호가 중복입니다.");
    }
  },

  validateBonusNumber(winningNumber, bonusNumber) {
    const winningNumberArray = winningNumber.split(",").map(Number);

    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error("[ERROR] 보너스 번호는 1 ~ 45 사이어야 합니다.");
    }
    if (isNaN(bonusNumber)) {
      throw new Error("[ERROR] 숫자를 입력해야 합니다.");
    }
    if (winningNumberArray.includes(bonusNumber)) {
      throw new Error("[ERROR] 당첨 번호랑 중복입니다.");
    }
  },
};
