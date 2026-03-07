import { generateLottos } from "./generateLottos.js";
import { generateRandomNumbers } from "./generateRandomNumbers.js";
import { getReturnRate } from "./utils/getReturnRate.js";
import {
  printProfitRate,
  printPurchaseCount,
  printPurchasedLottoNumbers,
  printWinStatistics,
} from "./view/outputView.js";
import WinningLotto from "./WinningLotto.js";
import {
  bonusNumberInputHandler,
  purchaseAmountInputHandler,
  restartInputHandler,
  winningNumberInputHandler,
} from "./view/inputHandler.js";
import { getPrizeList } from "./getPrizeList.js";
import { close } from "./view/input.js";

export const lottoGameController = async () => {
  const validatedAmount = await purchaseAmountInputHandler();
  const purchaseCount = parseInt(validatedAmount / 1000);
  printPurchaseCount(purchaseCount);

  const purchasedLottoNumbers = Array.from(
    { length: purchaseCount },
    generateRandomNumbers,
  );
  const generatedLottos = generateLottos(purchasedLottoNumbers);
  printPurchasedLottoNumbers(generatedLottos);

  const validatedWinningArray = await winningNumberInputHandler();
  const validatedBonusNumber = await bonusNumberInputHandler(
    validatedWinningArray,
  );

  const winningLotto = new WinningLotto(
    validatedWinningArray,
    validatedBonusNumber,
  );

  const prizeListArray = getPrizeList(generatedLottos, winningLotto);
  printWinStatistics(prizeListArray);

  const profitRate = getReturnRate(prizeListArray, validatedAmount);
  printProfitRate(profitRate);

  const validatedYn = await restartInputHandler();
  if (validatedYn === "y") {
    await lottoGameController();
  } else {
    close();
  }
};
