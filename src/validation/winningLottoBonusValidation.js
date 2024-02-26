import ERROR_MESSAGE from "../constants/errorMessage.js";

/**
 * 보너스 번호의 유효성 검사
 */
const winningLottoBonusValidation = {
  winningBonus: {
    notInWinningNumbers: {
      errorMessage: ERROR_MESSAGE.UNIQUE_BONUS_NUMBER,
      isValid(winningCombination) {
        const winningNumbers = winningCombination.normalNumbers;
        const winningBonus = winningCombination.bonusNumber;
        return !winningNumbers.includes(winningBonus);
      },
    },
  },
};

export default winningLottoBonusValidation;
