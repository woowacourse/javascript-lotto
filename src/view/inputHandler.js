import {
  parseCapitalToSmall,
  parseStringToNumber,
  parseStringToNumberArray,
} from "../utils/parser";
import {
  validateBonusNumber,
  validateLottoNumbers,
  validatePurchaseAmount,
  validateRestartInput,
} from "../utils/validator";
import {
  inputPurchaseAmount,
  inputWinningNumbers,
  inputBonusNumber,
  inputYesNo,
} from "./inputView";

const inputLoop = async (inputFn, parser, validator) => {
  while (true) {
    try {
      const input = await inputFn();
      return validator(parser(input));
    } catch (err) {
      console.log(err.message);
    }
  }
};

export const purchaseAmountInputHandler = () =>
  inputLoop(inputPurchaseAmount, parseStringToNumber, validatePurchaseAmount);

export const winningNumberInputHandler = () =>
  inputLoop(
    inputWinningNumbers,
    parseStringToNumberArray,
    validateLottoNumbers,
  );

export const bonusNumberInputHandler = (validatedWinningArray) =>
  inputLoop(inputBonusNumber, parseStringToNumber, (n) =>
    validateBonusNumber(n, validatedWinningArray),
  );

export const restartInputHandler = () =>
  inputLoop(inputYesNo, parseCapitalToSmall, validateRestartInput);
