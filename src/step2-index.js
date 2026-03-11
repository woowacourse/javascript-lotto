import { InputView } from "./view/input.js";
import LottoController from "./controller/LottoController.js";
import { webInputReader } from "./view/webInputReader.js";

InputView.setReader(webInputReader.inputPurchaseMoney);
const lottoGame = new LottoController();
await lottoGame.play();
