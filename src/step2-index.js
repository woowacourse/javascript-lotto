import "../style.css";
import HTMLInputView from "./view/HTMLView/HTMLInputView";
import HTMLOutputView from "./view/HTMLView/HTMLOutputView.js";
import RetryPlayer from "./controller/RetryPlayer.js";
import LottoMainController from "./controller/LottoMainController.js";

const lottoController = new LottoMainController(HTMLOutputView, HTMLInputView);

new RetryPlayer(HTMLInputView).asyncStart(
  lottoController.run.bind(lottoController)
);
