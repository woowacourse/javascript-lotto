import LottoController from "./controller/LottoController.js";
import { InputView } from "./view/input.js";
import { readLine } from "./utils/readLine.js";

InputView.setReader(readLine);
const lottoGame = new LottoController();
await lottoGame.play();
