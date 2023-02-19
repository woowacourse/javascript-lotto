const validatePurchaseAmount = require('./purchaseAmount');
const validateLottoNumber = require('./lottoNumber');
const validateWinningNumber = require('./winningNumber');
const validateBonusNumber = require('./bonusNumber');
const validateRestartCommand = require('./restartCommand');

module.exports = {
  validatePurchaseAmount,
  validateLottoNumber,
  validateWinningNumber,
  validateBonusNumber,
  validateRestartCommand,
};
