import RetryPlayer from "./controller/RetryPlayer.js";
import LottoMainController from "./controller/LottoMainController.js";
import InputView from "./view/InputVIew.js";
import OutputView from "./view/OutputView.js";

const lottoController = new LottoMainController(OutputView, InputView);

new RetryPlayer(InputView).asyncStart(
  lottoController.run.bind(lottoController)
);
