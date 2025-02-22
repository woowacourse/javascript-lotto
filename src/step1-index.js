/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoComparer from "../src/domain/LottoComparer.js";
import { printUserLottos, printResult } from "../src/view/output.js";
import {
  inputAskForRestart,
  inputBonusNumber,
  inputPrice,
  inputWinningNumbers,
} from "../src/view/input.js";
import LottoPrize from "./domain/LottoPrize.js";
import LottoGenerator from "./domain/LottoGenerator.js";

async function run() {
  const price = await inputPrice();

  const generatedLottos = LottoGenerator.getGenerateLottos(price);
  printUserLottos(price, generatedLottos);

  const winningNumbers = await inputWinningNumbers();
  const bonusNumber = await inputBonusNumber(winningNumbers);

  const lottoComparer = new LottoComparer(winningNumbers, bonusNumber);
  const compareResult = lottoComparer.lottoCompareResult(generatedLottos);

  const lottoPrize = new LottoPrize();
  lottoPrize.calculateTotalPrizeCount(compareResult);

  printResult(lottoPrize.prizeResult, lottoPrize.calculateROI(price));

  const isRestart = await inputAskForRestart();
  if (isRestart === "y") return await run();
}
run();
