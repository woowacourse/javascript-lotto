import { generateLottos } from "./generateLottos";
import { generateRandomNumbers } from "./generateRandomNumbers";
import { getReturnRate } from "./getReturnRate";
import {
  printProfitRate,
  printPurchaseCount,
  printPurchasedLottoNumbers,
  printWinStatistics,
} from "./view/outputView";
import WinningLotto from "./WinningLotto";
import {
  bonusNumberInputHandler,
  purchaseAmountInputHandler,
  restartInputHandler,
  winningNumberInputHandler,
} from "./view/inputHandler";

export const gameManager = async () => {
  const validatedAmount = await purchaseAmountInputHandler();
  const purchaseCount = parseInt(validatedAmount / 1000);
  printPurchaseCount(purchaseCount);

  let purchasedLottoNumbers = [];
  for (let i = 0; i < purchaseCount; i++) {
    purchasedLottoNumbers.push(generateRandomNumbers());
  }
  const generatedLottos = generateLottos(purchasedLottoNumbers);
  printPurchasedLottoNumbers(generatedLottos);

  const validatedWinningArray = await winningNumberInputHandler();
  const validatedBonusNumber = await bonusNumberInputHandler(
    validatedWinningArray
  );

  const winningLotto = new WinningLotto(
    validatedWinningArray,
    validatedBonusNumber
  );

  const prizeListArray = winningLotto.getPrizeList(generatedLottos);
  printWinStatistics(prizeListArray);

  const profitRate = getReturnRate(prizeListArray, validatedAmount);
  printProfitRate(profitRate);

  const validatedYn = await restartInputHandler();
  if (validatedYn === "y") await gameManager();
};
