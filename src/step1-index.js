import LottoController from "./controller/LottoController.js";
import { InputView } from "./view/input.js";
import { readLine } from "./utils/readLine.js";
import { OutputView } from "./view/output.js";

const consoleInputReader = {
  readPurchaseMoney: () => readLine("구입금액을 입력해 주세요."),
  readWinningNumber: () => readLine("\n당첨 번호를 입력해 주세요."),
  readBonusNumber: () => readLine("\n보너스 번호를 입력해 주세요."),
  readRetry: () => readLine("\n다시 시작하시겠습니까? (y/n)"),
}

InputView.setReader(consoleInputReader);
OutputView.setIsWeb(false);
const lottoGame = new LottoController();
await lottoGame.play();
