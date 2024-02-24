import executeOrRetryAsync from "../utils/executeOrRetryAsync";
import bonusNumberValidator from "../validator/BonusNumberValidator";
import CommonValidator from "../validator/CommonValidator";
import lottoNumberValidator from "../validator/LottoNumberValidator";
import InputView from "../view/InputView";

const WinningLottoGenerator = () => {
  const readAndValidateWinningLottoNumbers = async () => {
    const winningLottoNumbersInput = await InputView.readWinningLottoNumber();
    CommonValidator.validate(winningLottoNumbersInput);
    lottoNumberValidator.validate(winningLottoNumbersInput);

    return winningLottoNumbersInput.map(Number);
  };

  const readAndValidateBonusNumber = async (winningLottoNumbers) => {
    const bonusNumberInput = await InputView.readBonusNumber();
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
