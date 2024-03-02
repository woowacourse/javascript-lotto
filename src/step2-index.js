import "./step2/styles/reset.css";
import "./step2/styles/layout.css";
import "./step2/styles/common.css";
import LottoController from "./step2/controllers/LottoController";
import {
  registerCloseModalEvent,
  registerPurchaseEvent,
  registerRenderResultEvent,
  registerRestartEvent,
} from "./step2/dom/event";

const lottoController = new LottoController();

registerPurchaseEvent(lottoController.purchaseLottos.bind(lottoController));
registerRenderResultEvent(
  lottoController.renderWinningResult.bind(lottoController),
);
registerCloseModalEvent(
  lottoController.closeWinningResultModal.bind(lottoController),
);
registerRestartEvent(lottoController.restartLottoGame.bind(lottoController));
