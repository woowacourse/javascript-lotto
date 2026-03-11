import { InputView } from "./view/input.js";
import LottoController from "./controller/LottoController.js";
import { webInputReader } from "./view/webInputReader.js";
import { OutputView } from "./view/output.js";

InputView.setReader(webInputReader.inputPurchaseMoney);
OutputView.setIsWeb(true);
const lottoGame = new LottoController();
await lottoGame.play();
