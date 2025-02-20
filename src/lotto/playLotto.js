import { retryUntilValidInput } from "../utils/input.js";
import validationRestartInput from "../validation/validationRestartInput.js";
import readRestartInput from "../view/input/readRestartInput.js";
import getWinningNumbersAndBonusNumber from "./getWinningNumbersAndBonusNumber.js";
import purchaseLotto from "./purchaseLotto.js";
import showLottoResult from "./showLottoResult.js";

const playLotto = async () => {
  const { lottoPrice, lottoNumbers } = await purchaseLotto();
  const { winningNumbers, bonusNumber } =
    await getWinningNumbersAndBonusNumber();

  showLottoResult(lottoNumbers, winningNumbers, bonusNumber, lottoPrice);

  const restartCommand = await retryUntilValidInput({
    readUserInput: readRestartInput,
    validator: validationRestartInput,
  });

  return restartCommand;
};

export default playLotto;
