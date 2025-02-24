import SYSTEM_MESSAGE from "./constants/systemMessage.js";
import WinningLotto from "./domain/WinningLotto.js";
import { getRetryInput, getBonusNumber, getPrice, getWinningNumber } from "./service/InputService.js";
import { calculateProfitRate } from "./service/ProfitService.js";
import { getLottoArray, getLottoCount } from "./service/PurchaseService.js";
import retryOnError from "./util/retryOnError.js";
import OutputView from "./view/OutputView.js";

const purchaseLottos = async () => {
  const price = await retryOnError(getPrice, OutputView.printError);
  const lottoCount = getLottoCount(price);
  const lottoArray = getLottoArray(lottoCount);
  return { lottoArray, lottoCount };
};

const makeWinningLotto = async () => {
  const winningNumbers = await retryOnError(getWinningNumber, OutputView.printError);
  const bonusNumber = await retryOnError(() => getBonusNumber(winningNumbers), OutputView.printError);
  const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  return winningLotto;
};

const calculateMatchingResult = (winningLotto, lottoArray) => {
  const matchingResult = { 3: 0, 4: 0, 5: 0, 6: 0, bonus: 0 };

  lottoArray.forEach((lotto) => {
    const matchingCount = lotto.match(winningLotto).length;

    if (matchingCount < 3) return;

    if (matchingCount === 5 && lotto.has(winningLotto.bonusNumber)) {
      matchingResult["bonus"]++;
      return;
    }

    matchingResult[matchingCount]++;
  });
  return matchingResult;
};

const runLottoGame = async () => {
  while (true) {
    const { lottoArray, lottoCount } = await purchaseLottos();

    OutputView.print(SYSTEM_MESSAGE.COUNT(lottoCount));
    OutputView.printLottoArray(lottoArray);

    const winningLotto = await makeWinningLotto();
    const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
    const profitRate = calculateProfitRate(matchingResult, lottoCount);

    OutputView.printMatchingResult(matchingResult);
    OutputView.print(SYSTEM_MESSAGE.PROFIT(profitRate));

    const yesOrNo = await retryOnError(getRetryInput, OutputView.printError);
    if (yesOrNo === "n") {
      break;
    }
  }
};

await runLottoGame();
