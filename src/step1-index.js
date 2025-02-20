/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import readLineAsync from "./readLineAsync.js";
import UserLottos from "./UserLottos.js";
import LottoManager from "./LottoManager.js";
import { printUserLottos, printWinningResult, printROI } from "./output.js";
import {
  inputAskForRestart,
  inputBonusNumber,
  inputPrice,
  inputWinningNumbers,
} from "./input.js";

async function run() {
  while (true) {
    const price = await inputPrice();
    const userLottos = new UserLottos(price);
    printUserLottos(userLottos);

    const winningNumbers = await inputWinningNumbers();
    const bonusNumber = await inputBonusNumber(winningNumbers);

    const lottoManager = new LottoManager(
      userLottos.lottos,
      winningNumbers,
      bonusNumber
    );

    const countResults = lottoManager.countMatchingNumbers();
    const isContainBonusNumbers =
      lottoManager.containsBonusNumbers(countResults);
    lottoManager.calculateWinnings(countResults, isContainBonusNumbers);

    printWinningResult(lottoManager.prizeResult);
    printROI(lottoManager.calculateROI(price));

    const isRestart = await inputAskForRestart();
    if (isRestart === "n") break;
  }
}
run();
