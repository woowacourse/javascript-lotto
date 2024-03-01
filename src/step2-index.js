/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import WebLottoController from "./controller/WebLottoController.js";
import handler from "./view/handler.js";
import "./view/styles.css";

const webLottoController = new WebLottoController();

handler.headerResize();

document.getElementById("moneyInput").addEventListener("input", (event) => {
  const input = event.target.value;
  const regex = /^[0-9]*$/; // 숫자만을 허용하는 정규식
  if (!regex.test(input)) {
      event.target.value = input.replace(/[^\d]/g, ''); // 숫자가 아닌 문자를 제거
  }
});


handler.getMoney(webLottoController.getMoney.bind(webLottoController));
handler.getWinningLottoAndBonus(webLottoController.initWinningLotto.bind(webLottoController));
handler.getRank(webLottoController.printRankAndProfitRate.bind(webLottoController));
handler.restart(webLottoController.restart.bind(webLottoController))
