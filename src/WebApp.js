import LottoManager from "./domain/LottoManager";
import LottoPrize from "./domain/LottoPrize";
import { allowModalOpen } from "./domain/web/modal";
import { initLotto } from "./domain/web/setup";
import { getPrice, getWinningLotto } from "./view/web/input";
import {
  printLottoCount,
  printLottoResult,
  printLottos,
} from "./view/web/output";

initLotto();

export async function WebApp() {
  const price = await getPrice();
  printLottoCount(price);
  const lottos = LottoManager.generateLottos(price);
  printLottos(lottos);

  const { winningNumbers, bonusNumber } = await getWinningLotto();

  const lottoPrize = new LottoPrize(lottos);
  const prizeResult = lottoPrize.calculateWinnings(winningNumbers, bonusNumber);

  const ROI = lottoPrize.calculateROI(price, prizeResult);

  allowModalOpen();
  printLottoResult(prizeResult, ROI);
}
