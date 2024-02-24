import AsyncRetryPlayer from "./controller/AsyncRetryPlayer.js";
import LottoMainController from "./controller/LottoMainController.js";
import InputView from "./view/InputVIew.js";
import OutputView from "./view/OutputView.js";

const lottoController = new LottoMainController(OutputView, InputView);

const lottoRetryPlayer = new AsyncRetryPlayer(lottoController, InputView);

lottoRetryPlayer.start();
