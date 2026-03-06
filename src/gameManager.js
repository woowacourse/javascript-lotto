import { generateLottos } from "./generateLottos";
import { generateRandomNumbers } from "./generateRandomNumbers";
import { getReturnRate } from "./getReturnRate";
import {
  inputBonusNumber,
  inputPurchaseAmount,
  inputWinningNumbers,
  inputYesNo,
} from "./InputView";
import {
  printProfitRate,
  printPurchaseCount,
  printPurchasedLottoNumbers,
  printWinStatistics,
} from "./output";
import {
  parseCapitalToSmall,
  parseStringToNumber,
  parseStringToNumberArray,
} from "./parser";
import {
  validateBonusNumber,
  validateLottoNumbers,
  validatePurchaseAmount,
  validateRestartInput,
} from "./validator";
import WinningLotto from "./WinningLotto";

export const gameManager = async () => {
  const purchaseAmount = await inputPurchaseAmount();
  const parsedAmount = parseStringToNumber(purchaseAmount);
  const validatedAmount = validatePurchaseAmount(parsedAmount);
  const purchaseCount = parseInt(validatedAmount / 1000);
  printPurchaseCount(purchaseCount);

  let purchasedLottoNumbers = [];
  for (let i = 0; i < purchaseCount; i++) {
    purchasedLottoNumbers.push(generateRandomNumbers());
  }
  const generatedLottos = generateLottos(purchasedLottoNumbers);
  console.log(generatedLottos);
  printPurchasedLottoNumbers(generatedLottos);

  const winningInput = await inputWinningNumbers();
  const parsedWinningArray = parseStringToNumberArray(winningInput);
  const validatedWinningArray = validateLottoNumbers(parsedWinningArray);

  const bonusNumber = await inputBonusNumber();
  const parsedBonusNumber = parseStringToNumber(bonusNumber);
  const validatedBonusNumber = validateBonusNumber(
    parsedBonusNumber,
    validatedWinningArray,
  );

  const winningLotto = new WinningLotto(
    validatedWinningArray,
    validatedBonusNumber,
  );

  const prizeListArray = winningLotto.getPrizeList(generatedLottos);
  printWinStatistics(prizeListArray);

  const profitRate = getReturnRate(prizeListArray, validatedAmount);
  printProfitRate(profitRate);

  const yn = await inputYesNo();
  const parsedYn = parseCapitalToSmall(yn);
  const validatedYn = validateRestartInput(parsedYn);
  if (validatedYn === "y") await gameManager();
};
