import LottoManager from "../src/domain/LottoManager.js";
import { printUserLottos, printResult } from "../src/view/output.js";
import {
  inputAskForRestart,
  inputBonusNumber,
  inputPrice,
  inputWinningNumbers,
} from "../src/view/input.js";
import LottoPrize from "./domain/LottoPrize.js";

export async function App() {
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
