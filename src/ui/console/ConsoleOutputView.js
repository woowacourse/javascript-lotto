import { Console } from "@woowacourse/mission-utils";

const PREFIX = "[ERROR]";

export default class ConsoleOutView {
  static printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  }

  static printError(error) {
    Console.print(PREFIX + error.message);
  }
}
