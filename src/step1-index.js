/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import UserLottos from "../src/domain/UserLottos.js";
import LottoComparisonManager from "../src/domain/LottoComparisonManager.js";
import {
  printUserLottos,
  printWinningResult,
  printROI,
} from "../src/view/output.js";
import {
  inputAskForRestart,
  inputBonusNumber,
  inputPrice,
  inputWinningNumbers,
} from "../src/view/input.js";
import LottoPrizeManager from "../src/domain/LottoPrizeManager.js";

async function run() {
  const price = await inputPrice();
  const userLottos = new UserLottos(price);
  printUserLottos(userLottos);

  const winningNumbers = await inputWinningNumbers();
  const bonusNumber = await inputBonusNumber(winningNumbers);

  const lottoComparisonManager = new LottoComparisonManager(
    userLottos.lottos,
    winningNumbers,
    bonusNumber
  );

  const countResults = lottoComparisonManager.countMatchingNumbers();
  const isContainBonusNumbers =
    lottoComparisonManager.containsBonusNumbers(countResults);
  const lottoPrizeManager = new LottoPrizeManager(
    countResults,
    isContainBonusNumbers
  );

  lottoPrizeManager.calculateWinnings();
  printWinningResult(lottoPrizeManager.prizeResult);
  printROI(lottoPrizeManager.calculateROI(price));

  const isRestart = await inputAskForRestart();
  if (isRestart === "n") {
    return await run();
  }
}
run();
