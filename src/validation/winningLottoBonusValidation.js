import ERROR_MESSAGE from "../constants/errorMessage.js";

/**
 * 보너스 번호의 유효성 검사
 */
const winningLottoBonusValidation = {
  winningBonus: {
    notInWinningNumbers: {
      errorMessage: ERROR_MESSAGE.notInWinningNumbers,
      isValid(winningCombination) {
        const { normalNumbers, bonusNumber } = winningCombination;
        return !normalNumbers.includes(bonusNumber);
      },
    },
  },
};

export default winningLottoBonusValidation;
