import "../style.css";
import HTMLInputView from "./view/htmlView/HTMLInputView";
import HTMLOutputView from "./view/htmlView/HTMLOutputView";
import RetryPlayer from "./controller/RetryPlayer.js";
import LottoMainController from "./controller/LottoMainController.js";

const lottoController = new LottoMainController(HTMLOutputView, HTMLInputView);

new RetryPlayer(HTMLInputView).asyncStart(
  lottoController.run.bind(lottoController)
);
