import { dom } from "./view/ui/dom.js";
import WebLottoController from "./controller/WebLottoController.js";
import {
  modalCloseHandler,
  modalOverlayHandler,
  purchaseHandler,
  restartHandler,
  resultHandler,
} from "./handler/handler.js";

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const controller = new WebLottoController();

dom.purchaseBtn.addEventListener("click", purchaseHandler(controller));
dom.resultBtn.addEventListener("click", resultHandler(controller));
dom.restartBtn.addEventListener("click", restartHandler(controller));
dom.modalCloseBtn.addEventListener("click", modalCloseHandler(controller));
dom.modalOverlay.addEventListener("click", modalOverlayHandler());
