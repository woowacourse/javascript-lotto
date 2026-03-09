import { MissionUtils } from "@woowacourse/mission-utils";
import Validator from "../Utils/Validator.js";

const InputConsole = {
  async readPurchasePrice() {
    return await MissionUtils.Console.readLineAsync('> 구입금액을 입력해 주세요.')
  },

  async readWinningNumbers() {
    while (true) {
      try {
        const winningNumbers = await MissionUtils.Console.readLineAsync(
          "> 당첨 번호를 입력해 주세요. ",
        );
        return Validator.validateWinningNumbers(winningNumbers);
      } catch (e) {
        MissionUtils.Console.print(e.message);
      }
    }
  },

  async readBonusNumber(winningNumbers) {
    while (true) {
      try {
        const bonusNumber = await MissionUtils.Console.readLineAsync(
          "\n> 보너스 번호를 입력해 주세요. ",
        );
        return Validator.validateBonusNumber(bonusNumber, winningNumbers);
      } catch (e) {
        MissionUtils.Console.print(e.message);
      }
    }
  },

  async readRestart(){
    while (true) {
      try {
        const restartCommand = await MissionUtils.Console.readLineAsync(
          "\n> 다시 시작하시겠습니까? (y/n) ",
        );
        return restartCommand;
      } catch (e) {
        MissionUtils.Console.print(e.message);
      }
    }
  }
};

export default InputConsole;
