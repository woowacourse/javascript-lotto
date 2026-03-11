import LottoController from "./controller/LottoController.js";
import { InputView } from "./view/input.js";
import { readLine } from "./utils/readLine.js";
import { OutputView } from "./view/output.js";

InputView.setReader(readLine);
OutputView.setIsWeb(false);
const lottoGame = new LottoController();
await lottoGame.play();
