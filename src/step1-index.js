import LottoController from "./controller/LottoController.js";
import { InputView } from "./view/input.js";
import { OutputView } from "./view/output.js";
import { consoleInputReader } from "./view/consoleInputReader.js";

InputView.setReader(consoleInputReader);
OutputView.setIsWeb(false);
const lottoGame = new LottoController();
await lottoGame.play();
