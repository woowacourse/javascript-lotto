import { generateRandomNumbers } from "./generateRandomNumbers.js";
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
import { close } from "./view/input.js";
import PurchasedLotto from "./PurchasedLotto.js";

export const gameManager = async () => {
  const validatedAmount = await purchaseAmountInputHandler();
  const purchaseCount = parseInt(validatedAmount / 1000);
  printPurchaseCount(purchaseCount);

  const purchasedLottoNumbers = Array.from(
    { length: purchaseCount },
    generateRandomNumbers
  );

  const generatedLottos = new PurchasedLotto(purchasedLottoNumbers);

  printPurchasedLottoNumbers(generatedLottos.getLottos());

  const validatedWinningArray = await winningNumberInputHandler();
  const validatedBonusNumber = await bonusNumberInputHandler(
    validatedWinningArray
  );

  const winningLotto = new WinningLotto(
    validatedWinningArray,
    validatedBonusNumber
  );

  printWinStatistics(generatedLottos.getPrizeList(winningLotto));
  printProfitRate(
    generatedLottos.calculateReturnRate(winningLotto, validatedAmount)
  );

  const validatedYn = await restartInputHandler();
  if (validatedYn === "y") {
    await gameManager();
  } else {
    close();
  }
};
