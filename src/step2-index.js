/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import WebLottoController from "./controller/WebLottoController.js";
import handler from "./view/handler.js";
import "./view/styles.css";

const webLottoController = new WebLottoController();

handler.headerResize();

handler.getMoney(webLottoController.getMoney.bind(webLottoController));
handler.getWinningLottoAndBonus(webLottoController.initWinningLotto.bind(webLottoController));
handler.getRank(webLottoController.printRankAndProfitRate.bind(webLottoController));
handler.restart(webLottoController.restart.bind(webLottoController));
