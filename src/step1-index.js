/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import Validator from "./validator.js";
import LottoGame from "./domain/LottoGame.js";

export async function run() {
  let rawPriceString;
  let bonusNumber;
  let targetNumber;
  let retryAnswer;

  while (true) {
    while (true) {
      try {
        rawPriceString =
          await InputView.getInput("> 구입금액을 입력해 주세요.");
        Validator.isPrice(rawPriceString);
        break;
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }

    const lottoNum = Number(rawPriceString) / 1000;
    OutputView.printMessage(`${lottoNum}개를 구매했습니다.`);

    // 발행한 로또 출력
    const lottoGame = new LottoGame(lottoNum);
    lottoGame.lottoes.forEach((lotto) => {
      OutputView.printMessage(lotto.numbers);
    });

    OutputView.printBlank();
    while (true) {
      try {
        targetNumber = await InputView.getInput("> 당첨 번호를 입력해 주세요.");
        Validator.isTargetNumber(targetNumber);
        break;
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
    OutputView.printBlank();
    while (true) {
      try {
        bonusNumber =
          await InputView.getInput("> 보너스 번호를 입력해 주세요.");
        Validator.isBonusNumber(bonusNumber);
        break;
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
    lottoGame.calculate(targetNumber, bonusNumber);
    OutputView.printBlank();
    OutputView.printMessage("당첨 통계");
    OutputView.printMessage("--------------------");
    OutputView.printWinning(
      lottoGame.result,
      lottoGame.getEarningRate(lottoNum),
    );
    OutputView.printBlank();
    while (true) {
      try {
        retryAnswer = await InputView.getInput(
          "> 다시 시작하시겠습니까? (y/n) ",
        );
        Validator.isRestartString(retryAnswer);
        break;
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
    if (retryAnswer === "n") break;
  }
}

await run();
