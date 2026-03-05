import { MissionUtils } from "@woowacourse/mission-utils";
import Validator from "../Utils/Validator.js";

const InputConsole = {
  async readPurchasePrice() {
    while (true) {
      try {
        const purchasePrice =
          await MissionUtils.Console.readLineAsync(
            "> 구입금액을 입력해 주세요.",
          );
        return Validator.validatePurchasePrice(purchasePrice);
      } catch (e) {
        MissionUtils.Console.print(e.message);
      }
    }
  },

  async readWinningNumbers() {
    while (true) {
      try {
        const winningNumbers = await MissionUtils.Console.readLineAsync(
          "\n> 당첨 번호를 입력해 주세요. ",
        );
        return Validator.validateWinningNumbers(winningNumbers);
      } catch (e) {
        MissionUtils.Console.print(e.message);
      }
    }
  },

  async readBonusNumber() {
    while (true) {
      try {
        const bonusNumber = await MissionUtils.Console.readLineAsync(
          "\n> 보너스 번호를 입력해 주세요. ",
        );
        return bonusNumber;
      } catch (e) {
        MissionUtils.Console.print(e.message);
      }
    }
  },
};

export default InputConsole;
