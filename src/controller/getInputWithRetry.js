import Lotto from "../domain/Lotto.js";
import Input from "../view/Input.js";
import PriceValidator from "../validation/PriceValidator.js";
import BonusNumberValidator from "../validation/BonusNumberValidator.js";
import { INPUT, ERROR, RETRY_STRING } from "../constants/message.js";
import { throwError } from "../utils/throwError.js";

export const getPrice = async () =>
  Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.PRICE);
    new PriceValidator().validatePrice(Number(input));
    return Number(input);
  });

export const getNeededLottoNumbers = async () => {
  const winningLotto = await Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.WINNER_NUMBERS);
    const winningNumbersArray = input.split(",").map(Number);
    const winningLotto = new Lotto(winningNumbersArray);
    return winningLotto;
  });

  const bonusLottoNumber = await Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.BONUS_NUMBER);
    new BonusNumberValidator().validateBonusNumber(
      winningLotto.getLottoNumbers(),
      Number(input)
    );
    return Number(input);
  });
  return { winningLotto, bonusLottoNumber };
};

export const getRetryInput = async () => {
  return await Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.RETRY);
    if (!RETRY_STRING.includes(input)) {
      throwError(ERROR.INVALID_RETRY_STRING);
    }
    return input.toLowerCase();
  });
};
