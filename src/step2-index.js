/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import WebLottoController from "./controller/WebLottoController.js";
import "./view/web/css/styles.css";
import "./view/web/css/disabled.css";
import "./view/web/modal/modal.css";
import "./view/web/toast/toast.css";

import outputView from "./view/web/outputView.js";
import inputView from "./view/web/inputView.js";
import headerResize from "./view/web/headerResize.js";

const webLottoController = new WebLottoController(inputView, outputView);

headerResize();

webLottoController.game();
