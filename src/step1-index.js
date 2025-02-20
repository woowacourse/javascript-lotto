/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import UserLottos from "../src/domain/UserLottos.js";
import LottoComparer from "../src/domain/LottoComparer.js";
import {
  printUserLottos,
  printWinningResult,
  printROI,
} from "../src/view/output.js";
import {
  inputAskForRestart,
  inputPrice,
  inputWinningLotto,
} from "../src/view/input.js";
import LottoPrize from "./domain/LottoPrize.js";

async function run() {
  const price = await inputPrice();
  const userLottos = new UserLottos(price);
  printUserLottos(userLottos);

  const winningLotto = await inputWinningLotto();

  const lottoComparer = new LottoComparer(userLottos.lottos, winningLotto);

  const countResults = lottoComparer.countMatchingNumbers();
  const lottoPrize = new LottoPrize(countResults);
  lottoPrize.calculateWinnings();

  printWinningResult(lottoPrize.prizeResult);
  printROI(lottoPrize.calculateROI(price));

  const isRestart = await inputAskForRestart();
  if (isRestart === "y") return await run();
}
run();
