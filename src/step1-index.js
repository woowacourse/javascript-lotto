/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { COMMAND, LOTTO } from "./constants.js";
import InputView from "./View/InputView.js";
import LottoGenerator from "./LottoGenerator.js";
import OutputView from "./View/OutputView.js";
import ScoreBoard from "./ScoreBoard.js";
import WinningLotto from "./Model/WinningLotto.js";
import Validator from "./Validator.js";

class App {
  static async run() {
    while (true) {
      const money = await App.retry(InputView.readMoney, App.validateMoney);
      const buyLottoCount = money / LOTTO.PRICE;
      OutputView.printBuyLottoCount(buyLottoCount);

      const lottos = LottoGenerator.makeLottos(buyLottoCount);
      lottos.forEach((lotto) =>
        OutputView.printLottoNumbers(lotto.getNumbers()),
      );

      const winningNumbers = await App.retry(
        InputView.readWinningNumbers,
        App.validateWinningNumbers,
      );
      const winningLotto = await App.getWinningLotto(winningNumbers);

      const allRankCount = ScoreBoard.makeAllRankCount(lottos, winningLotto);
      const profitRate = ScoreBoard.getProfitRate(allRankCount, money);
      OutputView.printLottoResult(allRankCount, profitRate);

      const restartCommand = await App.retry(
        InputView.readRestartCommand,
        App.validateRestartCommand,
      );
      if (COMMAND.NO.includes(restartCommand)) break;
    }
  }

  static async getWinningLotto(winningNumbers) {
    try {
      const bonusNumber = await App.retry(
        InputView.readBonusNumber,
        App.validateBonusNumber,
      );
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      return winningLotto;
    } catch (error) {
      console.log(error.message);
      return await App.getWinningLotto(winningNumbers);
    }
  }

  static validateMoney(money) {
    Validator.numberDivided(money, LOTTO.PRICE);
    Validator.positiveNumber(money);
  }

  static validateWinningNumbers(winningNumbers) {
    winningNumbers.forEach((number) => {
      Validator.positiveNumber(number);
      Validator.numberLower(LOTTO.LOWER, number);
      Validator.numberUpper(LOTTO.UPPER, number);
    });
    Validator.notDuplicated(winningNumbers);

    Validator.arrayLength(winningNumbers, LOTTO.COUNT);
  }

  static validateBonusNumber(bonusNumber) {
    Validator.positiveNumber(bonusNumber);
    Validator.numberLower(LOTTO.LOWER, bonusNumber);
    Validator.numberUpper(LOTTO.UPPER, bonusNumber);
  }

  static validateRestartCommand(restartCommand) {
    const validCommand = COMMAND.YES.concat(COMMAND.NO);
    Validator.includeElement(restartCommand, validCommand);
  }

  static async retry(inputFunction, validation) {
    try {
      const input = await inputFunction();
      validation(input);
      return input;
    } catch (error) {
      console.log(error.message);
      return await App.retry(inputFunction, validation);
    }
  }
}

await App.run();
