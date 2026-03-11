import { InputView } from "./view/input.js";
import LottoController from "./controller/LottoController.js";
import { webReader } from "./view/webReader.js";

InputView.setReader(webReader.inputPurchaseMoney);
const lottoGame = new LottoController();
await lottoGame.play();
