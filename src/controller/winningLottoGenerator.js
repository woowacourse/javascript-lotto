import executeOrRetryAsync from '../utils/executeOrRetryAsync.js';
import bonusNumberValidator from '../validator/BonusNumberValidator.js';
import commonValidator from '../validator/CommonValidator.js';
import lottoNumberValidator from '../validator/LottoNumberValidator.js';
import InputView from '../view/InputView.js';

/* eslint-disable max-lines-per-function */
const WinningLottoGenerator = () => {
  const readAndValidateWinningLottoNumbers = async () => {
    const winningLottoNumbersInput = await InputView.readWinningLottoNumber();
    commonValidator.validate(winningLottoNumbersInput);
    lottoNumberValidator.validate(winningLottoNumbersInput);

    return winningLottoNumbersInput.map(Number);
  };

  const readAndValidateBonusNumber = async (winningLottoNumbers) => {
    const bonusNumberInput = await InputView.readBonusNumber();
    commonValidator.validate(bonusNumberInput.trim());
    bonusNumberValidator.validate({
      winningLottoNumbers,
      bonusNumber: bonusNumberInput,
    });

    return Number(bonusNumberInput);
  };

  const createWinningLotto = async () => {
    const winningLottoNumbers = await executeOrRetryAsync({
      asyncFn: readAndValidateWinningLottoNumbers,
      handleError: console.log,
    });
    const bonusNumber = await executeOrRetryAsync({
      asyncFn: () => readAndValidateBonusNumber(winningLottoNumbers),
      handleError: console.log,
    });

    return { winningLottoNumbers, bonusNumber };
  };

  return {
    createWinningLotto,
  };
};

export default WinningLottoGenerator;
