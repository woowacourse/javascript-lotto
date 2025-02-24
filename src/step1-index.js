/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoManager from "../src/domain/LottoManager.js";
import { printUserLottos, printResult } from "../src/view/output.js";
import {
  inputAskForRestart,
  inputBonusNumber,
  inputPrice,
  inputWinningNumbers,
} from "../src/view/input.js";
import LottoPrize from "./domain/LottoPrize.js";

async function run() {
  const price = await inputPrice();
  const lottos = LottoManager.generateLottos(price);
  printUserLottos(price, lottos);

  const winningNumbers = await inputWinningNumbers();
  const bonusNumber = await inputBonusNumber(winningNumbers);

  const lottoPrize = new LottoPrize(lottos);
  const prizeResult = lottoPrize.calculateWinnings(winningNumbers, bonusNumber);

  printResult(prizeResult, lottoPrize.calculateROI(price, prizeResult));

  const isRestart = await inputAskForRestart();
  if (isRestart === "y") return await run();
}
run();
