const Validation = require('../util/Validation');
const LottoValidator = require('./LottoValidator');

const InputValidator = {
  checkUserBudget(userBudget) {
    if (!Validation.isNumber(userBudget))
      throw new Error('[ERROR] 구입 금액은 자연수로만 입력해야 합니다.');

    if (!Validation.isUnitOfMoney(Number(userBudget), 1000))
      throw new Error('[ERROR] 구입 금액은 1000원 단위로만 입력가능합니다.');
  },

  checkWinningNumber(winningNumber) {
    if (!Validation.isValidInputType(winningNumber, /^[0-9]+(,[0-9]+)+$/)) {
      throw new Error('[ERROR] 당첨 번호는 콤마(,) 기준으로 입력해야합니다.');
    }
  },

  checkBonusNumber(winningNumber, bonusNumber) {
    if (!Validation.isNumber(bonusNumber))
      throw new Error('[ERROR] 보너스 번호는 자연수로만 입력해야 합니다.');

    if (!LottoValidator.isRangeOfLottoNumber(bonusNumber))
      throw new Error('[ERROR] 보너스 번호는 1 ~ 45까지의 숫자만 입력 가능합니다.');

    if (Validation.isIncludedNumber(winningNumber, Number(bonusNumber)))
      throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복되지 않아야 합니다.');
  },
};

module.exports = InputValidator;
