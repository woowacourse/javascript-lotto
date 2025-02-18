/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";

export async function run() {
  const buyMoney = await InputView.getInput("> 구입금액을 입력해 주세요.");
  const targetNumber = await InputView.getInput("> 당첨 번호를 입력해 주세요.");
  const bonusNumber =
    await InputView.getInput("> 보너스 번호를 입력해 주세요.");

  OutputView.printMessage("당첨 통계");
  OutputView.printMessage("--------------------");
  OutputView.printWinning({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 1 }, 62.5);
  const retryAnswer = await InputView.getInput(
    "> 다시 시작하시겠습니까? (y/n) ",
  );
}

await run();
