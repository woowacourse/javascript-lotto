import RetryPlayer from "./controller/RetryPlayer.js";
import LottoMainController from "./controller/LottoMainController.js";
import ConsoleOutputView from "./view/ConsoleView/ConsoleOutputView.js";
import ConsoleInputView from "./view/ConsoleView/ConsoleInputView.js";

const lottoController = new LottoMainController(
  ConsoleOutputView,
  ConsoleInputView
);

new RetryPlayer(ConsoleInputView).asyncStart(
  lottoController.run.bind(lottoController)
);
