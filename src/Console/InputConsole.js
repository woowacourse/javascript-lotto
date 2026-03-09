import { MissionUtils } from "@woowacourse/mission-utils";

const InputConsole = {
  async readPurchasePrice() {
    const input =
      await MissionUtils.Console.readLineAsync("> 구입금액을 입력해 주세요.");
    return input;
  },

  async readWinningNumbers() {
    const inputs =
      await MissionUtils.Console.readLineAsync("> 당첨 번호를 입력해 주세요. ");
    return inputs;
  },

  async readBonusNumber() {
    const input = await MissionUtils.Console.readLineAsync(
      "\n> 보너스 번호를 입력해 주세요. ",
    );
    return input;
  },

  async readRestart() {
    const restartCommand = await MissionUtils.Console.readLineAsync(
      "\n> 다시 시작하시겠습니까? (y/n) ",
    );
    return restartCommand;
  },
};

export default InputConsole;
