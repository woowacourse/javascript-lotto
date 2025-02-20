import readLineAsync from "../utils/readLineAsync.js";
import { validateBonusNumber } from "../utils/validate/validateBonusNumber.js";
import { validatePrice } from "../utils/validate/validatePrice.js";
import { validateWinningNumbers } from "../utils/validate/validateWinningNumbers.js";
import { vaildateRestart } from "../utils/validate/vaildateRestart.js";

export const inputPrice = async () => {
  try {
    const price = Number(await readLineAsync("구입금액을 입력해 주세요."));
    validatePrice(price);
    return price;
  } catch (error) {
    console.log(error.message);
    return await inputPrice();
  }
};

export const inputWinningNumbers = async () => {
  try {
    const winningNumbers = (await readLineAsync("\n당첨 번호를 입력해 주세요."))
      .split(",")
      .map(Number);
    validateWinningNumbers(winningNumbers);
    return winningNumbers;
  } catch (error) {
    console.log(error.message);
    return await inputWinningNumbers();
  }
};

export const inputBonusNumber = async (winningNumber) => {
  try {
    const bonusNumber = Number(
      await readLineAsync("\n보너스 번호를 입력해 주세요.")
    );
    validateBonusNumber(winningNumber, bonusNumber);
    return bonusNumber;
  } catch (error) {
    console.log(error.message);
    return await inputBonusNumber(winningNumber);
  }
};

export const inputAskForRestart = async () => {
  try {
    const answer = await readLineAsync("\n다시 시작하시겠습니까? (y/n)");
    vaildateRestart(answer);
    return answer;
  } catch (error) {
    console.log(error.message);
    return await inputAskForRestart();
  }
};
